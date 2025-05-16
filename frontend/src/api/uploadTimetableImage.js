// src/api/uploadTimetableImage.js
import axios from "axios";

/**
 * 시간표 이미지 업로드 후 OCR 결과 반환
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} - OCR로 추출된 강의 블록 배열
 */
export const uploadTimetableImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
  
    const response = await axios.post("/api/class-schedule/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    // 서버에서 { lectures: [...] } 형태로 응답하므로 lectures만 반환
    return response.data.lectures || [];
};
