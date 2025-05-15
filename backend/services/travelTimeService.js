const axios = require("axios");
const haversine = require("haversine-distance");
const { parseDuration } = require("../utils/parseDuration"); // 유틸에서 분 단위 변환 함수 가져오기

const GOOGLE_MAPS_API_KEY = (process.env.GOOGLE_MAPS_API_KEY || "").trim();
const OPENAI_API_KEY = "...";
 


// 📍 주소 → 좌표 변환
const getCoordinates = async (address) => {
  console.log("📍 Google Maps 지오코딩 요청:", address);
  const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: { address, key: process.env.GOOGLE_MAPS_API_KEY },
  });


  console.log("📡 Google 응답 상태:", response.status);

  const location = response.data.results[0]?.geometry?.location;
  if (!location) {
    console.error("❌ 주소 → 좌표 변환 실패 (결과 없음)");
    throw new Error("주소를 좌표로 변환할 수 없습니다.");
  }

  return {
    latitude: location.lat,
    longitude: location.lng
  };
};

// 🚶 도보 & 🚗 자차 → Google Directions API
const getGoogleDuration = async (from, to, mode) => {
  const response = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
    params: {
      origin: from,
      destination: to,
      mode,
      key: GOOGLE_MAPS_API_KEY,
      language: "ko",
    },
  });

  const route = response.data.routes?.[0];
  if (!route) return null;

  return route.legs[0].duration.text;
};

// 🤖 GPT-4o fallback 예측
const getFallbackTimeWithGPT = async (from, to, mode) => {
  const prompt = `
출발지는 "${from}", 도착지는 "${to}"야. 교통체증은 보통 수준이라고 가정하고, 
${mode === "walking" ? "도보" : "자차"}로 이동했을 때의 평균 예상 소요 시간을 분 단위로 알려줘.
단순 수치는 괜찮지만 최대한 현실적인 답을 줘. 결과는 숫자만 분 단위로 줘.
  `.trim();
  
  console.log("🔐 현재 GPT 키:", OPENAI_API_KEY);

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices?.[0]?.message?.content;
  if (!content) return "정보 없음";

  const match = content.match(/\d+/);
  return match ? `${match[0]}분` : "정보 없음";
};

// 🚇 대중교통: Google Directions
const getTransitInfo = async (from, to) => {
  const res = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
    params: {
      origin: from,
      destination: to,
      mode: "transit",
      key: GOOGLE_MAPS_API_KEY,
      language: "ko",
    },
  });

  const route = res.data.routes?.[0];
  if (!route) return { duration: "정보 없음", steps: [] };

  const duration = route.legs[0].duration.text;
  const steps = route.legs[0].steps
    .filter((s) => s.travel_mode === "TRANSIT")
    .map((s) => ({
      line: s.transit_details.line.short_name,
      vehicle: {
        BUS: "버스",
        SUBWAY: "지하철",
        TRAIN: "기차",
      }[s.transit_details.line.vehicle.type] || s.transit_details.line.vehicle.type,
      departure_stop: s.transit_details.departure_stop.name,
      arrival_stop: s.transit_details.arrival_stop.name,
    }));

  return { duration, steps };
};

// 📦 최종 API
exports.getTravelInfo = async (from, to) => {
  const [fromCoord, toCoord] = await Promise.all([
    getCoordinates(from),
    getCoordinates(to),
  ]);

  const straightDistance = (haversine(fromCoord, toCoord) / 1000).toFixed(2) + " km";

  // 도보/자차 먼저 Google, 실패 시 GPT-4o 사용
  let walking = await getGoogleDuration(from, to, "walking");
  if (!walking) {
    console.warn("도보 Google 실패 → GPT 대체");
    walking = await getFallbackTimeWithGPT(from, to, "walking");
  }

  let driving = await getGoogleDuration(from, to, "driving");
  if (!driving) {
    console.warn("자차 Google 실패 → GPT 대체");
    driving = await getFallbackTimeWithGPT(from, to, "driving");
  }

  const transit = await getTransitInfo(from, to);

  return {
    straightDistance,
    travelTimes: {
      walking,
      driving,
      transit: transit.duration,
      transit_details: transit.steps,
    },
  };
};

// 기존 코드 호환용: from (주소), target (위도/경도 객체)
exports.getDurations = async ({ from, target }) => {
  const to = `${target.latitude},${target.longitude}`; // 위경도 → 문자열

  const result = await exports.getTravelInfo(from, to);
  const travelTimes = result.travelTimes;

  return {
    walk: parseDuration(travelTimes.walking),
    drive: parseDuration(travelTimes.driving),
    transit: parseDuration(travelTimes.transit),
    raw: travelTimes,
  };
};
