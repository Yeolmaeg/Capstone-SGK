const { getPlaceInfoFromPerplexity } = require("../services/placeInfoService");
const { createAutoSchedule } = require("../services/scheduleService");

// 장소명 기반 자동 일정 추가
exports.autoAddFromPlaceName = async (req, res) => {
  const { place_name, user_id } = req.body;
  console.log("📥 자동 일정 추가 요청:", place_name, user_id);

  if (!place_name || !user_id) {
    return res.status(400).json({ error: "place_name과 user_id가 필요합니다." });
  }

  try {
    // 1. 장소 정보 받아오기
    const place = await getPlaceInfoFromPerplexity(place_name);

    // 2. 일정 자동 생성

    const schedule = await createAutoSchedule({
      user_id,
      place,
      source: "from_place",
      color: "#d1ebb6",
      recommendation_id: null
    });

    // 3. 응답 반환 (result 아님!)
    res.status(201).json({
      message: "✅ 자동 일정 생성 완료",
      schedule
    });
  } catch (err) {
    console.error("❌ 자동 일정 생성 실패:", err.message);
    res.status(500).json({ error: "일정 생성 실패" });
  }
};

