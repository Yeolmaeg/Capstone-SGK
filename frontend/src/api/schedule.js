import apiClient from './axios';

/**
 * 일정 추가 API
 * 
 * @param {Object} schedule 일정 데이터
 * @returns {Promise<Object>} 생성된 일정의 ID와 제목 등
 */
export const addSchedule = async (scheduleData) => {
  try {
    const response = await apiClient.post("/schedule", scheduleData); // 🔥 여기 경로 주의!
    return response.data;
  } catch (error) {
    console.error("❌ 일정 추가 실패:", error);
    throw error;
  }
};
