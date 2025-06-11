const placeService = require("../services/placeService");
const { v4: uuidv4, validate: isUUID } = require('uuid');

// 📌 장소 추가
exports.addPlace = async (req, res) => {
  try {
    const placeData = {...req.body};
    if (!placeData.id) {
  placeData.id = uuidv4(); // id가 없을 경우에만 생성
}
    
    console.log("📌 장소 추가 요청:", placeData);

    // 기본 유효성 검사
    if (!placeData.name || !placeData.address) {
      return res.status(400).json({ error: "name과 address는 필수입니다." });
    }


    const savedPlace = await placeService.addPlace(placeData);
    res.status(201).json(savedPlace);
    console.log(" 장소 저장 성공", placeData);
  } catch (error) {
    console.error("🛑 장소 추가 실패:", error);
    res.status(500).json({ error: "장소 저장 중 오류가 발생했습니다." });
  }
};
// 📌 장소 상세 설명 조회 (ID로 검색)
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

// 📌 장소 정보 조회 (ID로 검색)

exports.getPlaceById = async (req, res) => {
  const { placeId } = req.params;
  console.log("📝 장소 정보 요청된 ID:", placeId);

  try {
    // UUID 형식 체크
    if (!isUUID(placeId)) {
      console.warn("🛑 유효하지 않은 UUID:", placeId);
      return res.status(400).json({ error: "유효하지 않은 UUID입니다." });
    }

    const place = await placeService.getPlaceById(placeId);
    if (!place) {
      return res.status(404).json({ error: "장소를 찾을 수 없습니다." });
    }

    res.json(place);
  } catch (err) {
    console.error("장소 정보 조회 실패:", err);
    res.status(500).json({ error: "장소 정보 조회 중 오류 발생" });
  }
};