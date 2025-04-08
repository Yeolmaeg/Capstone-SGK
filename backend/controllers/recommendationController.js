const service = require("../services/recommendationService");
const travelTimeService = require("../services/travelTimeService"); 
const db = require("../lib/db");
const scheduleService = require("../services/scheduleService");

exports.getRecommendation = async (req, res) => {
  const { userId, time } = req.query;

  if (!userId || !time) {
    return res.status(400).json({ error: "userId and time are required" });
  }

  try {
    const result = await service.recommendPlace(userId, time);
    res.json({ recommendedPlaces: result });
  } catch (err) {
    console.error("Error in /recommendation:", err.message);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.saveFeedback = async (req, res) => {
  const { user_id, place_id, satisfied } = req.body;
  console.log("📝 추천 피드백 수신:", req.body);

  if (!user_id || !place_id || satisfied === undefined) {
    return res.status(400).json({ error: "필수 항목 누락" });
  }

  try {
    await service.saveFeedback({ user_id, place_id, satisfied });
    res.json({ message: "피드백 저장 완료" });
  } catch (err) {
    console.error("❌ 피드백 저장 실패:", err.message);
    res.status(500).json({ error: "피드백 저장 실패" });
  }
};

exports.saveRecommendation = async (req, res) => {
  try {
    const { user_id, place } = req.body;

    if (!user_id || !place) {
      return res.status(400).json({ error: "user_id와 place 정보가 필요합니다." });
    }

    const { recommendationId, placeId } = await service.saveRecommendation({ user_id, place });

    res.status(201).json({
      message: "추천 장소 저장 완료",
      place_id: placeId
    });
  } catch (err) {
    console.error("❌ 추천 장소 저장 실패:",  err.response?.data || err.message);
    res.status(500).json({ error: "추천 장소 저장 실패" });
  }
};


// 장소 정보에 이동시간 추가
exports.recommendWithTravelTimes = async (req, res) => {
  const { user_id, time } = req.body;

  try {
    // 1. 장소 추천받기 + 저장
    const places = await recommendationService.recommendPlace(user_id, time);
    const place = places[0];
    const placeId = await recommendationService.saveRecommendation({ user_id, place });

    // 2. 이동시간 계산 요청 (GPT API로 받아온 정보 추가)
    const times = await travelTimeService.getDurations({ // travelTimeService에서 이동수단 별 이동시간 반환
      user_id,
      target: {
        latitude: place.latitude,
        longitude: place.longitude
      }
    });

    res.json({
      place_id: placeId,
      name: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      category: place.category,
      description: place.description,
      hours: place.hours,
      walk_duration: times.walk,
      transit_duration: times.transit,
      drive_duration: times.drive
    });
  } catch (err) {
    console.error("❌ 추천 + 이동시간 API 실패:", err);
    res.status(500).json({ error: "추천 또는 이동시간 정보 처리 실패" });
  }
};

// 추천 일정 생성
exports.createScheduleFromRecommendation = async (req, res) => {
  const {
    user_id,
    place_id,
    start_time,
    end_time,
    move_type,
    move_duration,
    walk_duration,
    transit_duration,
    drive_duration
  } = req.body;

  try {
    // 1. 장소 정보 가져오기
    const place = await placeService.getPlaceById(place_id);
    if (!place) {
      return res.status(404).json({ error: "장소를 찾을 수 없습니다." });
    }

    // 2. 일정 생성
    await scheduleService.addSchedule({
      user_id,
      title: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      place_id,
      recommendationId,
      start_time,
      end_time,
      move_type,
      move_duration,
      walk_duration,
      transit_duration,
      drive_duration,
      source: "recommendation",
      is_recurring: false
    });

    res.status(201).json({ message: "추천 일정 추가 완료" });
  } catch (err) {
    console.error("❌ 추천 일정 생성 에러:", err);
    res.status(500).json({ error: "추천 일정 생성 실패" });
  }
};

exports.autoCreateScheduleFromRecommendation = async (req, res) => {
  const { user_id, time } = req.body;

  try {
    const places = await service.recommendPlace(user_id, time);
    const place = places.recommendedPlaces[0];

    const place_id = await service.saveRecommendation({ user_id, place });

    const prev = await db.query(`
      SELECT address FROM schedules 
      WHERE user_id = $1 AND end_time < $2 
      ORDER BY end_time DESC 
      LIMIT 1
    `, [user_id, time]);
    const from = prev.rows[0]?.address || "서울 성동구";

    const durations = await travelTimeService.getDurations({
      user_id,
      target: {
        latitude: place.latitude,
        longitude: place.longitude,
      },
      from,
    });

    const durationMap = {
      walking: durations.walk,
      driving: durations.drive,
      transit: durations.transit,
    };

    let shortestType = "walking";
    let shortestDuration = durations.walk;
    for (const [type, duration] of Object.entries(durationMap)) {
      if (duration !== null && duration < shortestDuration) {
        shortestType = type;
        shortestDuration = duration;
      }
    }

    const start_time = new Date(time);
    const end_time = new Date(start_time.getTime() + 60 * 60 * 1000);

    await scheduleService.addSchedule({
      user_id,
      title: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      place_id,
      start_time,
      end_time,
      move_type: shortestType,
      move_duration: shortestDuration,
      walk_duration: durations.walk,
      transit_duration: durations.transit,
      drive_duration: durations.drive,
      source: "recommendation",
      is_recurring: false
    });

    const saved = await db.query(
      `SELECT * FROM schedules 
       WHERE user_id = $1 AND title = $2 AND start_time = $3`,
      [user_id, place.name, start_time]
    );

    res.status(201).json({
      message: "추천 + 이동시간 + 일정 자동 생성 완료",
      schedule: saved.rows[0],
      place,
      recommendationId,
      placeId
    });

  } catch (err) {
    console.error("❌ 자동 추천 일정 생성 실패:", err.message);
    res.status(500).json({ error: "추천 일정 생성 실패" });
  }
};
