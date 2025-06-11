const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");

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

const getPlaceDescriptionById = async (placeId) => {
  const result = await db.query(
    'SELECT description FROM places WHERE id = $1',
    [placeId]
  );
  return result.rows[0]?.description || null;

};

// 장소 추가 함수
const addPlace = async (data) => {
  const { id, name, address, latitude, longitude, category, hours, description } = data;

  // 1. 이미 존재하는 ID면 조회해서 반환
  const exists = await db.query(`SELECT * FROM places WHERE id = $1`, [id]);
  if (exists.rows.length > 0) {
    console.log("⚠️ 이미 존재하는 place 반환:", id);
    return exists.rows[0];
  }

  // 2. 새로 저장
  const result = await db.query(
    `INSERT INTO places (id, name, address, latitude, longitude, category, hours, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [id, name, address, latitude, longitude, category, hours, description]
  );
  return result.rows[0];
};


module.exports = { 
  getPlaceById,
  getPlaceInfo,
  getPlaceDescriptionById,
  addPlace, 
};
