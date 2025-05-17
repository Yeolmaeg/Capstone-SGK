import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// 1. 자동 추천 일정 생성 (4-7)
export const autoCreateRecommendedSchedule = async (userId, timeISO) => {
  const response = await axios.post(`${BASE_URL}/recommendation/auto`, {
    user_id: userId,
    time: timeISO,
  });

   const data = response.data;
  return {
    place: data.place || null,
    schedule: data.schedule || null,
    recommendationId: data.recommendationId || null,
    placeId: data.placeId || null,
  };
};

// 2. 추천 피드백 저장 (4-5)
export const sendFeedback = async ({ user_id, recommendationId, satisfied }) => {
  const response = await axios.post(`${BASE_URL}/feedback`, {
    user_id,
    recommendationId,
    satisfied,
  });
  return response.data;
};

// 3. 사용자 키워드 조회 (4-6)
export const getUserPreferences = async (userId) => {
  const response = await axios.get(`${BASE_URL}/preferences/${userId}`);
  return response.data; // { userId, preferences: [...] }
};
