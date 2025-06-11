// src/api/lectureSchedule.js

import axios from "axios";

/**
 * OCR로 추출된 강의들을 바탕으로 반복 일정을 생성합니다.
 * @param {string} userId - 사용자 ID
 * @param {string} semesterStart - 개강일 (형식: "YYYY-MM-DD")
 * @param {string} semesterEnd - 종강일 (형식: "YYYY-MM-DD")
* @param {Array} lectures - OCR 결과로 추출된 강의 배열 
* @returns {Promise<Array>} - 생성된 schedule 배열
 */
// OCR 강의 기반 반복 일정 → schedules 테이블로 바로 insert
export const generateSchedulesFromLectures = async (userId, semesterStart, semesterEnd, lectures) => {
  const response = await axios.post("/api/schedule/generate-from-lectures", {
    userId,
    semesterStart,
    semesterEnd,
    lectures,
  });
  return response.data.schedules;
};

/**
 * 사용자 ID로 강의 스케줄 조회
 * @param {String} userId - 사용자 ID
 * @returns {Promise<Object[]>} 조회된 스케줄 리스트
 */
export const getLectureSchedules = async (userId) => {
  const response = await axios.get(`/api/lecture-schedules/user/${userId}`);
  return response.data.schedules || [];
};
