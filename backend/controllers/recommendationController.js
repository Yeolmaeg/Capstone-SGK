const service = require("../services/recommendationService");
const travelTimeService = require("../services/travelTimeService"); 

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

    const placeId = await service.saveRecommendation({ user_id, place });

    res.status(201).json({
      message: "추천 장소 저장 완료",
      place_id: placeId
    });
  } catch (err) {
    console.error("❌ 추천 장소 저장 실패:", err.message);
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