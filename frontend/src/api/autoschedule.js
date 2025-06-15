import apiClient from "../api/axios";

/**
 * 자동 일정 생성 API
 * @param {string} placeName 장소명
 * @param {string} userId 사용자 ID
 * @returns {Promise<Object>} 생성된 일정 데이터
 */
export const autoAddSchedule = async (placeName, userId) => {
  try {
    const res = await apiClient.post("/auto-schedule", {
      place_name: placeName,
      user_id: userId,
    });
    return res.data;
  } catch (err) {
    console.error("❌ 자동 일정 생성 실패:", err);
    throw err;
  }
};
