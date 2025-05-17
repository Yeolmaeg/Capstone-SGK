const placeService = require("../services/placeService");

exports.getPlaceDescription = async (req, res) => {
  const { placeId } = req.params;
  console.log("📝 상세 설명 요청된 장소 ID:", placeId);

  if (!placeId) {
    return res.status(400).json({ error: "placeId is required" });
  }

  try {
    const description = await placeService.getPlaceDescriptionById(placeId);
    if (!description) {
      return res.status(404).json({ error: "설명 정보가 없습니다." });
    }
    res.json({ description });
  } catch (err) {
    console.error("설명 조회 실패:", err);
    res.status(500).json({ error: "설명 정보 조회 중 오류 발생" });
  }
};
