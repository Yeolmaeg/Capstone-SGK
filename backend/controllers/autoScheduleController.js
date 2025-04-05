const { autoAddScheduleFromPlaceName } = require("../services/autoScheduleService");

// 장소명 기반 자동 일정 추가
exports.autoAddFromPlaceName = async (req, res) => {
  const { place_name, user_id } = req.body;
  console.log("📥 자동 일정 추가 요청:", place_name, user_id);

  if (!place_name || !user_id) {
    return res.status(400).json({ error: "place_name과 user_id가 필요합니다." });
  }

  try {
    const result = await autoAddScheduleFromPlaceName(place_name, user_id);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ 자동 일정 생성 실패:", err.message);
    res.status(500).json({ error: "일정 생성 실패" });
  }
};
