const { getLecturesByDay } = require("../models/lectureModel");
const { decideBestMatchByName } = require("../services/gptMatcher");

// OCR 후보의 교시 문자를 1~7 교시 숫자 문자열로 변환하는 함수
const periodLetterToPeriodDigit = (period) => {
  const mapping = {
    A: "1",
    B: "2",
    C: "3",
    D: "4",
    E: "5",
    F: "6",
    G: "7",
  };
  return mapping[period] || null;
};

const matchLectureForBlock = async (block) => {
  // 요일 매핑: 월:1, 화:2, 수:3, 목:4, 금:5
  const dayMapping = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5 };
  const dbDay = dayMapping[block.day];
  // OCR에서 얻은 period를 1~7 숫자(문자)로 변환
  const detectedPeriodDigit = periodLetterToPeriodDigit(block.period);

  console.log(`Matching for block - Day: ${block.day} (DB day: ${dbDay}), Period: ${block.period} (detected digit: ${detectedPeriodDigit}), OCR candidate: ${block.lectureNameCandidate}`);

  if (!dbDay || !detectedPeriodDigit) return null;

  let candidates = [];
  try {
    // DB에서 해당 요일의 모든 강의를 조회
    candidates = await getLecturesByDay(dbDay);
  } catch (e) {
    console.error(`DB query error for Day: ${block.day}`, e);
  }

  // DB 강의의 class_time(숫자)를 문자열로 변환하여, detectedPeriodDigit을 포함하는지 체크합니다.
  const filteredCandidates = candidates.filter(lecture => {
    const ctStr = String(lecture.class_time);
    return ctStr.includes(detectedPeriodDigit);
  });

  console.log(`DB candidates for Day: ${block.day} after filtering by period digit (${detectedPeriodDigit}):\n`, JSON.stringify(filteredCandidates, null, 2));

  // 이름 매칭: filteredCandidates 중에서, OCR 후보 이름과 DB 강의 이름(공백 제거 후) 간에 최소 2글자 이상의 연속 문자열이 일치하는지 확인
  const matchedLecture = await decideBestMatchByName(filteredCandidates, block.lectureNameCandidate);
  console.log(`Matched lecture for Day: ${block.day} Period: ${block.period}:`, matchedLecture);
  return matchedLecture;
};

const matchLectures = async (detectedBlocks) => {
  const results = [];
  for (const block of detectedBlocks) {
    const lecture = await matchLectureForBlock(block);
    if (lecture) {
      results.push(lecture);
    }
  }
  console.log("Final matched lectures:", JSON.stringify(results, null, 2));
  return results;
};

module.exports = { matchLectures };
