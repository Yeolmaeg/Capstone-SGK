const axios = require("axios");
const redis = require("../lib/redis");
const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const { getAddressFromCoords } = require("../services/addressService");
const API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = process.env.PERPLEXITY_API_KEY;

// 주소가 null이 아니면 true
async function isValidLocation(lat, lng) {
  try {
    const { address } = await getAddressFromCoords(lat, lng);
    return !!address;
  } catch (err) {
    console.error("❌ 역지오코딩 검증 실패:", err.message);
    return false; // 에러 났을 때도 유효하지 않은 걸로 간주
  }
}

function extractJsonArray(text) {
  const firstBracket = text.indexOf("[");
  if (firstBracket === -1) return null;

  let stack = 0;
  for (let i = firstBracket; i < text.length; i++) {
    if (text[i] === "[") stack++;
    else if (text[i] === "]") stack--;

    if (stack === 0) {
      return text.slice(firstBracket, i + 1);
    }
  }
  return null;
}

// 🔧 JSON 파싱 유틸
function parseRecommendations(rawText) {
   console.log("Perplexity rawText 응답:", rawText);  // 여기에 로그 추가
  
   // 1. Markdown 코드블럭 제거
  rawText = rawText.replace(/```json/g, "").replace(/```/g, "");

  try {
    // 2. 정확한 JSON 배열 추출
    const jsonOnly = extractJsonArray(rawText);
    if (!jsonOnly) {
      console.error("❌ JSON 배열 추출 실패");
      return [];
    }

    console.log("🔍 JSON 부분 추출:", jsonOnly);

    // 3. JSON 파싱
    const arr = JSON.parse(jsonOnly);
    console.log(`✅ JSON 파싱 성공: ${arr.length}개 아이템`);

    // 4. 키 변환
    const mapped = arr.map(item => ({
      name: item["장소 이름"],
      address: item["위치"],
      description: item["설명"],
      category: item["카테고리"],
      why: item["키워드"],
      latitude: item["위도"],
      longitude: item["경도"],
      hours: item["영업 시간"] || null
    }));

    return mapped;
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", e);
    return [];
  }
}

// 🔍 이전 일정 조회
async function getPreviousSchedule(userId, timeISO) {
  const result = await db.query(`
    SELECT title, latitude, longitude, end_time
    FROM schedules
    WHERE user_id = $1 AND end_time < $2
    ORDER BY end_time DESC
    LIMIT 1
  `, [userId, timeISO]);

  return result.rows[0] || null;
}

// ✅ 장소 추천 (자동 추천)
exports.recommendPlace = async (userId, time) => {
  const keywords = await redis.smembers(`user:${userId}:preferences`);
  if (!keywords || keywords.length === 0) {
    throw new Error("No user keywords found");
  }

  const prev = await getPreviousSchedule(userId, time);
  if (!prev) throw new Error("No previous schedule found");

  const placeName = prev.title || "이전 일정 장소";
  const lat = prev.latitude;
  const lon = prev.longitude;

  const query = `
"${placeName}" (위도: ${lat}, 경도: ${lon})에서 반경 500m 이내 장소 중 다음 키워드 중 하나를 아무거나 골라서 여기와 관련된 장소 한 곳을 추천해줘: ${keywords.join(", ")}.
각 장소는 아래 정보를 포함해줘.
1. 장소 이름
2. 위치
3. 장소에 대한 설명 반드시 한 문장으로만 요약!
4. 사용자 선호 키워드 중 어떤 키워드와 연관이 있어서 사용자가 선호할 거 같은지 설명
5. 영업 시간 (예: 매일 10:00~22:00, 월요일 휴무 등)
6. 어떤 장소인지 설명하는 장소 카테고리
형식: JSON 배열 [
  {
    "장소 이름": "...",
    "위치": "...",
    "한 줄 설명": "...",
    "카테고리": "...",
    "키워드": "...",
    "영업 시간": "...",
    "위도": ...,
    "경도": ...
  }
] 반드시 위 형식의 json배열로 응답해. 다른 말 수식하지 마`.trim();

  const response = await axios.post(API_URL, {
    model: "sonar-pro",
    messages: [{ role: "user", content: query }]
  }, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  const text = response.data.choices?.[0]?.message?.content || "";
  const parsedPlaces = parseRecommendations(text);

  console.log("▶ parseRecommendations 반환값:", parsedPlaces);

  const results = [];
  for (const place of parsedPlaces) {
    const { 위도: lat, 경도: lng } = place;
    const valid = await isValidLocation(lat, lng);

    if (!valid) {
      console.warn("🚫 유효하지 않은 장소 필터링됨:", place["장소 이름"]);
      continue; // 다음 장소로 넘어감
    }

    const placeId = await upsertPlace(place);
    results.push({ ...place, placeId });
  }

  if (results.length === 0) {
    throw new Error("유효한 추천 장소가 없습니다.");
  }

  return { recommendedPlaces: results };
};

// ✅ 피드백 저장
exports.saveFeedback = async ({ user_id, place_id, satisfied }) => {
  await db.query(
    `INSERT INTO recommendations (user_id, place_id, satisfied)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, place_id)
     DO UPDATE SET satisfied = $3, created_at = NOW()`,
    [user_id, place_id, satisfied]
  );
};

// ✅ 추천 저장 (place + recommendation)
exports.saveRecommendation = async ({ user_id, place }) => {
  const placeId = await upsertPlace(place);

  const existing = await db.query(`
    SELECT id FROM recommendations WHERE user_id = $1 AND place_id = $2
  `, [user_id, placeId]);

  if (existing.rows.length > 0) {
    return {
      recommendationId: existing.rows[0].id,
      placeId
    };
  }

  const result = await db.query(`
    INSERT INTO recommendations (user_id, place_id)
    VALUES ($1, $2)
    RETURNING id
  `, [user_id, placeId]);

  return {
    recommendationId: result.rows[0].id,
    placeId
  };
};

// ✅ recommendationId → placeId
exports.getPlaceIdFromRecommendation = async (recommendationId) => {
  const result = await db.query(
    'SELECT place_id FROM recommendations WHERE id = $1',
    [recommendationId]
  );
  return result.rows[0]?.place_id || null;
};

// 🔧 장소 저장 (중복 검사 포함)
async function upsertPlace(place) {
  const {
    name, address, description, category,
    hours, latitude, longitude
  } = place;

  const existing = await db.query(
    `SELECT id FROM places WHERE name = $1 AND address = $2`,
    [name, address]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0].id;
  }

  const id = uuidv4();

  await db.query(`
    INSERT INTO places (id, name, address, description, category, hours, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [id, name, address, description, category, hours, latitude, longitude]);

  return id;
}
