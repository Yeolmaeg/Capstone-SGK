const gridPositions = require("../utils/gridPositions");
const { performOCR } = require("./ocrService");
const Jimp = require("jimp");

/**
 * 전체 이미지 URL을 받아 한 번만 OCR 수행
 * @param {string} imageUrl - S3 공개 이미지 URL
 * @returns {Array} - 단일 블록 (전체 텍스트)로 처리
 */
// ✅ 이미지 버퍼를 인자로 받도록 수정

const processImageAndExtractText = async (imageUrl) => {
  console.log("🧠 Starting OCR processing using URL...");

  let ocrResult = "";
  try {
    ocrResult = await performOCR(imageUrl); // ✅ URL 기반 OCR
  } catch (e) {
    console.error("❌ OCR error for imageUrl:", imageUrl, e);
    return [];
  }

  console.log("📄 OCR result:\n", ocrResult);

  // 기본 가공 (선택사항)
  if (ocrResult && ocrResult.trim().length > 0) {
    const lines = ocrResult.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    return [
      {
        day: "전체", // 이제 grid 기반 아님
        period: "전체",
        lectureNameCandidate: lines.join(" "),
      },
    ];
  }

  return [];
};

module.exports = { processImageAndExtractText };