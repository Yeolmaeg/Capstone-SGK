const db = require("../lib/db");

// 장소 조회 (추천 -> 일정 생성용)
exports.getPlaceById = async (id) => {
  const result = await db.query(
    `SELECT * FROM places WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};
