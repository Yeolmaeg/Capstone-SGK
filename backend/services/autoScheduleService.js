const db = require("../lib/db");
const { addSchedule } = require("./scheduleService");
const { v4: uuidv4 } = require("uuid");
const { getPlaceInfoFromPerplexity } = require("./placeInfoService");
const { getDurations } = require("./travelTimeService");

exports.getUserSchedulesWithinWeek = async (user_id) => {
  const now = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(now.getDate() + 7);

  const result = await db.query(
    `
    SELECT *
    FROM schedules
    WHERE user_id = $1
    ORDER BY start_time ASC
    `,
    [user_id]
  );

  return result.rows;
};


function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findBestSlotByDistance(schedules, targetLat, targetLon, minGapMinutes = 60) {
  const sorted = schedules.sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  console.log("📋 전체 일정 수:", sorted.length);
  sorted.forEach(s => {
    console.log("📆 일정:", {
      title: s.title,
      start: s.start_time,
      end: s.end_time,
      lat: s.latitude,
      lon: s.longitude
    });
  });

  const slotCandidates = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    const endTime = new Date(current.end_time);
    const nextStart = new Date(next.start_time);
    const gapMinutes = (nextStart - endTime) / (1000 * 60);

    console.log("⏱️ 일정 사이 시간차:", {
      prev: current.title,
      next: next.title,
      gap: gapMinutes
    });

    if (gapMinutes >= minGapMinutes && current.latitude != null && current.longitude != null) {
      const distance = calculateDistance(current.latitude, current.longitude, targetLat, targetLon);

      console.log("🧩 후보 슬롯:", {
        prev: current.title,
        next: next.title,
        start_time: endTime.toISOString(),
        gapMinutes,
        distance,
      });

      slotCandidates.push({
        start_time: endTime.toISOString(),
        end_time: new Date(endTime.getTime() + 60 * 60 * 1000).toISOString(),
        between: { prev: current, next: next },
        duration_minutes: 60,
        distance,
      });
    }
  }

  const last = sorted[sorted.length - 1];
  if (!last) {
  console.log("❌ 마지막 일정이 없음");
  return null;
}
  const lastEnd = new Date(last.end_time);
  const oneWeekLater = new Date();
  oneWeekLater.setDate(new Date().getDate() + 7);
  const gapMinutes = (oneWeekLater - lastEnd) / (1000 * 60);

  if (gapMinutes >= minGapMinutes && last.latitude != null && last.longitude != null) {
    const distance = calculateDistance(last.latitude, last.longitude, targetLat, targetLon);

    console.log("🧩 마지막 슬롯 후보:", {
      prev: last.title,
      start_time: lastEnd.toISOString(),
      gapMinutes,
      distance,
    });

    slotCandidates.push({
      start_time: lastEnd.toISOString(),
      end_time: new Date(lastEnd.getTime() + 60 * 60 * 1000).toISOString(),
      between: { prev: last, next: null },
      duration_minutes: 60,
      distance,
    });
  }


  if (slotCandidates.length === 0) return null;

  slotCandidates.sort((a, b) => a.distance - b.distance);

  console.log("✅ 선택된 최종 슬롯:", {
    prev: slotCandidates[0].between?.prev?.title,
    start_time: slotCandidates[0].start_time,
    distance: slotCandidates[0].distance
  });

  return slotCandidates[0];
}
exports.autoAddScheduleFromPlaceName = async (placeName, userId, color = "#d1ebb6") => {
  try {
    const place = await getPlaceInfoFromPerplexity(placeName);
    if (!place || !place.latitude || !place.longitude) {
      throw new Error("장소 정보가 유효하지 않습니다.");
    }
    const placeId = await placeService.savePlaceAndGetId(place);

    const schedules = await exports.getUserSchedulesWithinWeek(userId);
    const bestSlot = findBestSlotByDistance(schedules, place.latitude, place.longitude);
    if (!bestSlot) throw new Error("일정을 추가할 수 있는 빈 시간이 없습니다.");

    const start_time = new Date(bestSlot.start_time);
    const end_time = new Date(start_time.getTime() + 60 * 60 * 1000);

    const from = bestSlot.between?.prev?.address || "서울 서대문구";
    const durations = await getDurations({
      user_id: userId,
      target: {
        latitude: place.latitude,
        longitude: place.longitude,
      },
      from
    });

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
      source: "from_place",
      color,
      place_id: placeId
    });

    return {
      message: "✅ 일정 자동 추가 완료",
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
