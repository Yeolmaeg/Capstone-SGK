const db = require("../lib/db");
const { addSchedule } = require("./scheduleService");
const { v4: uuidv4 } = require("uuid");
const { getPlaceInfoFromPerplexity } = require("./placeInfoService");
const { getDurations } = require("./travelTimeService");


// 전체 흐름: 프론트에서 장소명 입력 → 백엔드는 장소 정보 수집 → 
// 일정 조회 및 빈 시간 계산 → 가장 가까운 시간대 추천 → 일정 자동 생성


// 일주일 내 일정 가져옴 
exports.getUserSchedulesWithinWeek = async (user_id) => {
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);
  
    const result = await db.query(
      `
      SELECT *
      FROM schedules
      WHERE user_id = $1
        AND start_time >= $2
        AND start_time <= $3
      ORDER BY start_time ASC
      `,
      [user_id, now.toISOString(), oneWeekLater.toISOString()]
    );
  
    return result.rows;
  };
  

// 빈 시간대 계산 (1시간 이상 공백인지)
function findAvailableTimeSlots(schedules, minGapMinutes = 60) {
    const availableSlots = [];
  
    // 1. 일정이 없을 경우 → 하루 전체가 빈 시간
    if (schedules.length === 0) {
      const now = new Date();
      const oneWeekLater = new Date();
      oneWeekLater.setDate(now.getDate() + 7);
      availableSlots.push({
        start_time: now.toISOString(),
        end_time: oneWeekLater.toISOString(),
        duration_minutes: (oneWeekLater - now) / (1000 * 60),
        between: null,
      });
      return availableSlots;
    }
  
    // 2. 일정이 하나뿐인 경우 → 그 전후로 하루 전체가 빈 시간
    if (schedules.length === 1) {
      const schedule = schedules[0];
      const now = new Date();
      const oneWeekLater = new Date();
      oneWeekLater.setDate(now.getDate() + 7);
  
      // 일정 전
      if (new Date(schedule.start_time) > now) {
        availableSlots.push({
          start_time: now.toISOString(),
          end_time: schedule.start_time,
          duration_minutes:
            (new Date(schedule.start_time) - now) / (1000 * 60),
          between: {
            prev: null,
            next: {
              title: schedule.title,
              latitude: schedule.latitude,
              longitude: schedule.longitude,
              address: schedule.address,
            },
          },
        });
      }
  
      // 일정 후
      if (new Date(schedule.end_time) < oneWeekLater) {
        availableSlots.push({
          start_time: schedule.end_time,
          end_time: oneWeekLater.toISOString(),
          duration_minutes:
            (oneWeekLater - new Date(schedule.end_time)) / (1000 * 60),
          between: {
            prev: {
              title: schedule.title,
              latitude: schedule.latitude,
              longitude: schedule.longitude,
              address: schedule.address,
            },
            next: null,
          },
        });
      }
  
      return availableSlots;
    }
  
    // 3. 일정이 2개 이상일 때 → 기존처럼 인접 일정 간 공백 계산
    const sorted = schedules.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );
  
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
  
      const endTime = new Date(current.end_time);
      const nextStart = new Date(next.start_time);
      const gapMinutes = (nextStart - endTime) / (1000 * 60);
  
      if (gapMinutes >= minGapMinutes) {
        availableSlots.push({
          start_time: endTime.toISOString(),
          end_time: nextStart.toISOString(),
          duration_minutes: gapMinutes,
          between: {
            prev: {
              title: current.title,
              latitude: current.latitude,
              longitude: current.longitude,
              address: current.address,
            },
            next: {
              title: next.title,
              latitude: next.latitude,
              longitude: next.longitude,
              address: next.address,
            },
          },
        });
      }
    }
  
    return availableSlots;
  }  
  
  // 장소와 빈 시간대 사이 거리 계산 함수
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // 지구 반지름 (km)
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 거리 (km)
  }
  
  // 빈 시간대 중 가장 가까운 동선을 찾는 함수
  function findClosestTimeSlot(availableSlots, targetLat, targetLon) {
    if (!availableSlots || availableSlots.length === 0) return null;
  
    let minDistance = Infinity;
    let bestSlot = null;
  
    for (const slot of availableSlots) {
      if (!slot.between || !slot.between.prev) continue;
  
      const prevLat = slot.between.prev.latitude;
      const prevLon = slot.between.prev.longitude;
  
      if (prevLat == null || prevLon == null) continue;
  
      const distance = calculateDistance(prevLat, prevLon, targetLat, targetLon);
  
      if (distance < minDistance) {
        minDistance = distance;
        bestSlot = slot;
      }
    }
  
    return bestSlot;
  }
  
  

  exports.autoAddScheduleFromPlaceName = async (placeName, userId) => {
    try {
      // 1. 장소 정보 수집
      const place = await getPlaceInfoFromPerplexity(placeName);
      if (!place || !place.latitude || !place.longitude) {
        throw new Error("장소 정보가 유효하지 않습니다.");
      }
  
      // 2. 일정 조회 + 빈 시간대 계산
      const schedules = await exports.getUserSchedulesWithinWeek(userId);
      const availableSlots = findAvailableTimeSlots(schedules);
  
      // 3. 가장 가까운 동선의 빈 시간대 찾기
      const closestSlot = findClosestTimeSlot(availableSlots, place.latitude, place.longitude);
      if (!closestSlot) throw new Error("일정을 추가할 수 있는 빈 시간이 없습니다.");
  
      // 4. 일정 추가 (source: "from_place")
      const start_time = closestSlot.start_time;
      const end_time = new Date(new Date(start_time).getTime() + 60 * 60 * 1000).toISOString(); // 1시간짜리 일정
      
      const from = closestSlot.between?.prev?.address || "서울 서대문문구"; 
      // 5. 이동시간 계산
const durations = await getDurations({
  user_id: userId,
  target: {
    latitude: place.latitude,
    longitude: place.longitude,
  },
  from
});

// 6. 최단 이동수단 선택
const durationMap = {
  walking: durations.walk,
  driving: durations.drive,
  transit: durations.transit,
};

let shortestType = "walking";
let shortestDuration = durations.walk;

for (const [type, time] of Object.entries(durationMap)) {
  if (time !== null && time < shortestDuration) {
    shortestType = type;
    shortestDuration = time;
  }
}
      await addSchedule({
        user_id: userId,
  title: place.title || placeName,
  latitude: place.latitude,
  longitude: place.longitude,
  address: place.location,
  start_time,
  end_time,
  move_type: shortestType,
  move_duration: shortestDuration,
  walk_duration: durations.walk,
  transit_duration: durations.transit,
  drive_duration: durations.drive,
  source: "from_place"
      });
  
      return { message: "✅ 일정 자동 추가 완료",
        place: place,
        start_time,
        move_type: shortestType,
        move_duration: shortestDuration 
      };
    } catch (err) {
      console.error("❌ 자동 일정 생성 실패:", err.message);
      throw err;
    }
  };
