const gridPositions = require("../utils/gridPositions");
const { performOCR } = require("./ocrService");
const Jimp = require("jimp");

// ✅ 이미지 버퍼를 인자로 받도록 수정
const processImageAndExtractText = async (imageBuffer) => {
  console.log("🧠 Starting OCR processing...");

  const image = await Jimp.read(imageBuffer);
  const detectedBlocks = [];

  for (const block of gridPositions) {
    console.log(`📍 Processing grid block - Day: ${block.day}, Period: ${block.period}`);
    const width = block.x2 - block.x1;
    const height = block.y2 - block.y1;

    const cropped = image.clone().crop(block.x1, block.y1, width, height);
    const buffer = await cropped.getBufferAsync(Jimp.MIME_JPEG);

    let ocrResult = "";
    try {
      ocrResult = await performOCR(buffer, block);
    } catch (e) {
      console.error(`❌ OCR error for Day: ${block.day}, Period: ${block.period}`, e);
    }

    console.log(`📄 OCR result for Day: ${block.day}, Period: ${block.period}:\n`, ocrResult);

    if (ocrResult && ocrResult.trim().length > 0) {
      const lines = ocrResult.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
      const lectureNameCandidate = lines.slice(0, -1).join(" ");
      console.log(`✅ Extracted lecture:`, lectureNameCandidate);

      detectedBlocks.push({
        day: block.day,
        period: block.period,
        lectureNameCandidate,
      });
    } else {
      console.log(`⚠️ No text detected for Day ${block.day}, Period ${block.period}`);
    }
  }

  console.log("📦 All detected blocks:", JSON.stringify(detectedBlocks, null, 2));
  return detectedBlocks;
};

module.exports = { processImageAndExtractText };
