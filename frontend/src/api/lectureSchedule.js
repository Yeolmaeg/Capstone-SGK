// src/api/lectureSchedule.js

import axios from "axios";

/**
 * 개강일/종강일로 강의 스케줄 생성 요청
 * @param {String} userId - 사용자 ID
 * @param {String} semesterStart - "YYYY-MM-DD"
 * @param {String} semesterEnd - "YYYY-MM-DD"
 * @returns {Promise<Object[]>} 생성된 스케줄 리스트
 */
export const generatelectureSchedule = async (userId, semesterStart, semesterEnd) => {
  const response = await axios.post("/api/lecture-schedules/generate", {
    userId,
    semesterStart,
    semesterEnd,
  });

  return response.data.schedules || [];
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
