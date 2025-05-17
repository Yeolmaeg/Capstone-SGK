const db = require("../lib/db");

// 장소 조회 (추천 -> 일정 생성용)
const getPlaceById = async (id) => {
  const result = await db.query(
    `SELECT * FROM places WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

// 예시: DB에서 place_name으로 장소 정보 찾기
const getPlaceInfo = async (placeName) => {
  const result = await db.query(
    `SELECT * FROM places WHERE name = $1 LIMIT 1`,
    [placeName]
  );
  return result.rows[0] || null;
};

// 장소 설명 조회 (ID로 조회)
const getPlaceDescriptionById = async (id) => {
  const result = await db.query(
    'SELECT description FROM places WHERE id = $1',
    [id]
  );
  return result.rows[0]?.description || null;
};

// 장소 추가 함수
const addPlace = async ({ name, address, latitude, longitude, category, hours, description }) => {
  const result = await db.query(
    `INSERT INTO places (name, address, latitude, longitude, category, hours, description) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [name, address, latitude, longitude, category, hours, description]
  );
  return result.rows[0];
};

module.exports = { 
  getPlaceById,
  getPlaceInfo,
  getPlaceDescriptionById,
  addPlace, 
};
