import axios from "axios";

// 📌 기본 API URL 설정 (환경 변수 사용 권장)
const BASE_URL = "http://localhost:5000/api/places";

// 📌 장소 추가 (addPlace)
export const addPlace = async (placeData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, placeData);
    console.log("✅ 장소 저장 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🛑 장소 저장 실패:", error);
    throw error;
  }
};

// 📌 장소 상세 정보 조회 (ID로 검색)
export const getPlaceById = async (placeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${placeId}`);
    console.log("✅ 장소 정보 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🛑 장소 정보 조회 실패:", error);
    throw error;
  }
};

// 📌 장소 목록 조회
export const getAllPlaces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log("✅ 장소 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🛑 장소 목록 조회 실패:", error);
    throw error;
  }
};

// 📌 장소 삭제
export const deletePlace = async (placeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${placeId}`);
    console.log("✅ 장소 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🛑 장소 삭제 실패:", error);
    throw error;
  }
};
