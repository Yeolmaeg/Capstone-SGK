const axios = require("axios");
const redis = require("../lib/redis");
const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");

const API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = "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";

function parseRecommendations(rawText) {
  try {
    const startIdx = rawText.indexOf("[");
    const endIdx = rawText.lastIndexOf("]");

    if (startIdx === -1 || endIdx === -1) {
      console.error("❌ JSON 배열 형식이 아님");
      return [];
    }

    const jsonOnly = rawText.slice(startIdx, endIdx + 1).trim();
    const arr = JSON.parse(jsonOnly);

    return arr.map(item => ({
      name: item["장소 이름"],
      address: item["위치"],
      description: item["설명"],
      category: item["카테고리"],
      why: item["키워드"],
      latitude: item["위도"],
      longitude: item["경도"],
      hours: item["영업 시간"] || null
    }));
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", e);
    return [];
  }
}

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

exports.recommendPlace = async (userId, time) => {
  // 1. 사용자 키워드 가져오기
  const preferenceData = await redis.get(`user:${userId}:preferences`);
  const keywords = preferenceData ? JSON.parse(preferenceData).keywords : [];

  if (keywords.length === 0) {
    throw new Error("No user keywords found");
  }

  // 2. 직전 일정 가져오기
  const prev = await getPreviousSchedule(userId, time);
  if (!prev) throw new Error("No previous schedule found");

  const placeName = prev.title || "이전 일정 장소";
  const lat = prev.latitude;
  const lon = prev.longitude;

  // 3. 프롬프트 생성
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
    "설명": "...",
    "카테고리": "...", ← 장소 종류 (예: 카페, 식당, 전시, 서점 등)
    "키워드": "(예시: 자연을 사랑하신다면 강남 한복판에서도 자연의 싱그러움을 느낄 수 있는 힐링 장소로, 숲속 산책과 계절감을 만끽할 수 있어요!)"
    "영업 시간": "...",
    "위도": (예시: 37.56),
    "경도": (예시: 126.93)
  }
]`.trim();

  // 4. API 호출
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

  const results = [];

  for (const place of parsedPlaces) {
    const placeId = await upsertPlace(place);
    results.push({ ...place, placeId });
  }

  return { recommendedPlaces: results };
};

exports.saveFeedback = async ({ user_id, place_id, satisfied }) => {
  await db.query(
    `
    INSERT INTO recommendations (user_id, place_id, satisfied)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, place_id)
    DO UPDATE SET satisfied = $3, created_at = NOW()
    `,
    [user_id, place_id, satisfied]
  );
};

// 추천 저장 (place + recommendation)
exports.saveRecommendation = async ({ user_id, place }) => {
  const placeId = await upsertPlace(place);

  await db.query(`
    INSERT INTO recommendations (user_id, place_id, satisfied)
    VALUES ($1, $2, NULL)
    ON CONFLICT (user_id, place_id)
    DO NOTHING
  `, [user_id, placeId]);

  return placeId;
};

// 1. place 테이블에 저장 (중복 검사 포함)
async function upsertPlace(place) {
  const {
    name,
    address,
    description,
    category,
    hours,
    latitude,
    longitude
  } = place;

  // 기존 장소 있는지 확인
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
  `, [
    id,
    name,
    address,
    description,
    category,
    hours,
    latitude,
    longitude
  ]);

  return id;
}

// 2. recommendation 테이블에 저장
exports.saveRecommendation = async ({ user_id, place }) => {
  const placeId = await upsertPlace(place);

  await db.query(`
    INSERT INTO recommendations (user_id, place_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, place_id) DO NOTHING
  `, [user_id, placeId]);

  return placeId;
};