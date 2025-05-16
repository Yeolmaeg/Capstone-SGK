import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // 실제 백엔드 주소로 변경 필요

// 추천 피드백 저장 (키워드 추출)
export const saveFeedback = async (userId, recommendationId, satisfied) => {
  try {
    const response = await axios.post(`${BASE_URL}/feedback`, {
      user_id: userId,
      recommendationId: recommendationId,
      satisfied: satisfied,
    });
    
    return response.data; // 성공적으로 피드백이 저장된 경우 응답 반환
  } catch (error) {
    console.error("피드백 저장 실패:", error);
    throw new Error("피드백 저장에 실패했습니다.");
  }
};
