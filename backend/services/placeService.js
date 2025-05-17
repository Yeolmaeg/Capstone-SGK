const db = require("../lib/db");

// 장소 조회 (추천 -> 일정 생성용)
exports.getPlaceById = async (id) => {
  const result = await db.query(
    `SELECT * FROM places WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

exports.getPlaceInfo = async (placeName) => {
  // 예시: DB에서 place_name으로 장소 정보 찾기
  const result = await db.query(
    `SELECT * FROM places WHERE name = $1 LIMIT 1`,
    [placeName]
  );
  return result.rows[0] || null;
};

exports.getPlaceDescriptionById = async (placeId) => {
  const result = await db.query(
    'SELECT description FROM places WHERE id = $1',
    [placeId]
  );
  return result.rows[0]?.description || null;
};