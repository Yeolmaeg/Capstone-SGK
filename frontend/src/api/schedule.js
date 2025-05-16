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

/**
 * 일정 조회 API
 * 
 * @param {string} user_id 사용자 ID
 * @returns {Promise<Object[]>} 사용자의 일정 목록
 */
export const getSchedules = async (user_id) => {
  try {
    const response = await apiClient.get("/schedule", {
      params: { user_id },
    });
    console.log("📦 일정 목록 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 일정 조회 실패:", error);
    throw error;
  }
};

/**
 * 단일 일정 조회 API
 * 
 * @param {string} id 일정 ID
 * @returns {Promise<Object>} 해당 일정 정보
 */
export const getScheduleById = async (id) => {
  try {
    const response = await apiClient.get(`/schedule/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ 단일 일정 조회 실패:", error);
    throw error;
  }
};

/**
 * 일정 수정 API
 * 
 * @param {string} id 일정 ID
 * @param {Object} updatedData 수정할 데이터
 * @returns {Promise<Object>} 수정 결과 응답
 */
export const updateSchedule = async (id, updatedData) => {
  try {
    const response = await apiClient.patch(`/schedule/${id}`, updatedData);
    console.log("✅ 일정 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 일정 수정 실패:", error);
    throw error;
  }
};

/**
 * 일정 삭제 API
 * 
 * @param {string} id 삭제할 일정 ID
 * @returns {Promise<Object>} 삭제 결과 응답
 */
export const deleteSchedule = async (id) => {
  try {
    const response = await apiClient.delete(`/schedule/${id}`);
    console.log("✅ 삭제 요청 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 삭제 요청 실패:", error);
    throw error;
  }
};
