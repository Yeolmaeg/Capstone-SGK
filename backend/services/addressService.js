const db = require("../lib/db");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

exports.addAddress = async ({ user_id, name, address, latitude, longitude }) => {
  const id = uuidv4();
  await db.query(
    `INSERT INTO user_address (id, user_id, name, address, latitude, longitude)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, user_id, name, address, latitude, longitude]
  );
  return id;
};

exports.getAddresses = async (user_id) => {
  const result = await db.query(
    `SELECT id, name, address, latitude, longitude
     FROM user_address WHERE user_id = $1
     ORDER BY created_at DESC`,
    [user_id]
  );
  return result.rows;
};

exports.updateAddress = async (id, name) => {
  await db.query(
    `UPDATE user_address SET name = $1 WHERE id = $2`,
    [name, id]
  );
};

exports.deleteAddress = async (id) => {
  await db.query(`DELETE FROM user_address WHERE id = $1`, [id]);
};

exports.getAddressFromCoords = async (lat, lng) => {
  console.log("📍 역지오코딩 요청 좌표:", { lat, lng }); // 요청 위치 확인  
  try {
      const { data } = await axios.get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
        headers: {
          Authorization: `KakaoAK c40a4d200246f0916d99dd6a32eb4f19`
        },
        params: {
          x: lng,
          y: lat
        }
      });

      console.log("📬 Kakao 응답 데이터:", JSON.stringify(data, null, 2)); // 전체 응답 확인
  
      const result = data.documents?.[0]?.address;
      
      console.log("✅ 추출된 주소:", result?.address_name); // 최종 주소 확인

      return {
        address: result?.address_name || null
      };
    } catch (err) {
      console.error("❌ 카카오 좌표→주소 변환 실패:", err.response?.data || err.message);
      throw new Error("역지오코딩 실패");
    }
  };
  
  exports.getAddressById = async (id) => {
    const result = await db.query(
      `SELECT id, name, address, latitude, longitude
       FROM user_address WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  };
  

exports.getCoordsFromAddress = async (address) => {
  const { data } = await axios.get("https://dapi.kakao.com/v2/local/search/address.json", {
    headers: {
      Authorization: `KakaoAK ${"c40a4d200246f0916d99dd6a32eb4f19"}`
    },
    params: {
      query: address
    }
  });

  const result = data.documents?.[0];
  return {
    address: result?.address?.address_name || null,
    latitude: result?.y ? parseFloat(result.y) : null,
    longitude: result?.x ? parseFloat(result.x) : null
  };
};
