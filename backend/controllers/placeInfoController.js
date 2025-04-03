const service = require("../services/placeInfoService");

exports.getPlaceInfo = async (req, res) => {
  const { placeName } = req.body;
  console.log("요청 받은 placeName:", placeName);

  if (!placeName) {
    console.warn("placeName이 전달되지 않음");
    return res.status(400).json({ error: "placeName is required" });
  }

  try {
    const info = await service.getPlaceInfoFromPerplexity(placeName);
    console.log("장소 정보 수신 완료:", info);
    res.json(info);
  } catch (err) {
    console.error("Perplexity API 처리 중 에러:", err.message);
    res.status(500).json({ error: "장소 정보 수집 실패" });
  }
};
