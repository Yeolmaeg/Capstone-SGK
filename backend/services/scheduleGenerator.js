const pool = require("../lib/db");
const { getGeocode } = require("./geocodeService");

/**
 * JavaScript의 Date.getDay()는 0(일요일)부터 6(토요일)을 반환합니다.
 * lectures.day는 1(월) ~ 5(금)로 가정하므로, 0은 7로 변환합니다.
 */
function adjustJsDay(jsDay) {
  return jsDay === 0 ? 7 : jsDay;
}

/**
 * 주어진 강의(lecture)와 학기 시작/종강 날짜로 해당 강의의 반복 일정(스케줄)을 생성합니다.
 * @param {Object} lecture - lectures 테이블의 한 행 (예: { day, start_time, end_time, name, address, class_time, ... })
 * @param {Date} semesterStart - 개강일 (Date 객체)
 * @param {Date} semesterEnd - 종강일 (Date 객체)
 * @param {String} userId - 일정을 생성할 사용자의 id
 * @returns {Array} - 생성된 일정(schedule) 객체 배열
 */
async function generateSchedulesForLecture(lecture, semesterStart, semesterEnd, userId) {
  const schedules = [];
  // lecture.day는 1(월) ~ 5(금)
  const lectureDay = lecture.day;
  
  // 개강일로부터 해당 요일에 해당하는 첫 번째 날짜를 찾습니다.
  let firstOccurrence = new Date(semesterStart);
  while (true) {
    if (adjustJsDay(firstOccurrence.getDay()) === lectureDay) {
      break;
    }
    firstOccurrence.setDate(firstOccurrence.getDate() + 1);
  }

  // 학기 종료일까지 매주 반복하여 일정을 생성합니다.
  while (firstOccurrence <= semesterEnd) {
    const occurrenceDate = new Date(firstOccurrence);
    
    // lectures.start_time, end_time은 문자열("HH:MM" 또는 "HH:MM:SS")
    const startParts = lecture.start_time.split(":").map(Number);
    const endParts = lecture.end_time.split(":").map(Number);
   
    // ✅ start_time을 UTC 기준으로 조립
    const startDateTime = new Date(
      occurrenceDate.getFullYear(),
      occurrenceDate.getMonth(),
      occurrenceDate.getDate(),
      startParts[0],
      startParts[1],
      startParts[2] || 0
    );
    startDateTime.setHours(startDateTime.getHours() - 9); // UTC 변환

    // ✅ end_time도 동일하게 UTC 기준으로 조립
    const endDateTime = new Date(
      occurrenceDate.getFullYear(),
      occurrenceDate.getMonth(),
      occurrenceDate.getDate(),
      endParts[0],
      endParts[1],
      endParts[2] || 0
    );
    endDateTime.setHours(endDateTime.getHours() - 9); // UTC 변환


    // ✅ 여기서 로그 찍기!
    console.log("📅 생성된 일정 로그:");
    console.log("lecture:", lecture.name);
    console.log("startDateTime (local):", startDateTime.toString());
    console.log("startDateTime.toISOString():", startDateTime.toISOString());
    console.log("endDateTime (local):", endDateTime.toString());
    console.log("endDateTime.toISOString():", endDateTime.toISOString());

    // geocoding: 강의 address를 위도/경도로 변환
    let latitude = null, longitude = null;
    try {
      const geo = await getGeocode(lecture.address);
      latitude = geo.latitude;
      longitude = geo.longitude;
    } catch (err) {
      console.error(`Geocoding failed for address: ${lecture.address}`, err);
    }

    const schedule = {
      user_id: userId,
      title: lecture.name,       // lectures.name
      address: lecture.address,  // lectures.address
      latitude,
      longitude,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      move_type: null,
      move_duration: null,
      walk_duration: null,
      transit_duration: null,
      drive_duration: null,
      source: "timetable",
      is_recurring: false,
    };

    schedules.push(schedule);
    // 다음 주 동일 요일로
    firstOccurrence.setDate(firstOccurrence.getDate() + 7);
  }
  return schedules;
}

/**
 * 주어진 학기(개강일, 종강일) 동안 DB의 모든 강의를 조회하여 반복 일정을 생성하고, 
 * 새 테이블 lecture_schedules에 삽입합니다.
 * @param {String} userId - 일정을 생성할 사용자의 id
 * @param {String} semesterStartStr - 개강일 (예: "2025-09-01")
 * @param {String} semesterEndStr - 종강일 (예: "2025-12-15")
 * @returns {Array} - 생성된 일정 객체 배열
 */
async function generateSchedulesForSemester(
  userId,
  semesterStartStr,
  semesterEndStr,
  lecturesFromClient = null // ✅ 프론트에서 넘긴 lectures 배열
) {
  const semesterStart = new Date(semesterStartStr);
  const semesterEnd = new Date(semesterEndStr);

  // ✅ 조건 분기: 프론트에서 lectures를 넘겼는지 확인
  let lectures;
  if (lecturesFromClient && Array.isArray(lecturesFromClient)) {
    lectures = lecturesFromClient;
    console.log("Using client-provided lectures:", lectures.length);
  } else {
    const lecturesResult = await pool.query("SELECT * FROM lectures");
    lectures = lecturesResult.rows;
    console.log("Using DB lectures:", lectures.length);
  }

  let allSchedules = [];

  for (const lecture of lectures) {
    const schedulesForLecture = await generateSchedulesForLecture(
      lecture,
      semesterStart,
      semesterEnd,
      userId
    );
    allSchedules = allSchedules.concat(schedulesForLecture);
  }

  // ✅ schedules 테이블에 직접 삽입
  for (const schedule of allSchedules) {
    try {
      await pool.query(
        `INSERT INTO schedules (
           user_id, title, address, latitude, longitude,
           start_time, end_time, move_type, move_duration,
           walk_duration, transit_duration, drive_duration,
           source, is_recurring, color
         ) VALUES (
           $1, $2, $3, $4, $5,
           $6, $7, $8, $9, $10,
           $11, $12, $13,
           $14, $15
         )`,
        [
          schedule.user_id,
          schedule.title,
          schedule.address,
          schedule.latitude,
          schedule.longitude,
          schedule.start_time,
          schedule.end_time,
          schedule.move_type,
          schedule.move_duration,
          schedule.walk_duration,
          schedule.transit_duration,
          schedule.drive_duration,
          schedule.source,
          schedule.is_recurring,
          schedule.color,
        ]
      );
    } catch (err) {
      console.error("❌ Error inserting into schedules:", err);
    }
  }

  console.log("✅ Generated schedules inserted into schedules table");
  return allSchedules;
}

module.exports = {
  generateSchedulesForSemester
};

