const gridPositions = require("../utils/gridPositions");
const { performOCR } = require("./ocrService");
const Jimp = require("jimp");

const processImageAndExtractText = async (imagePath) => {
  console.log("Starting OCR processing for image:", imagePath);
  const image = await Jimp.read(imagePath);
  const detectedBlocks = [];

  for (const block of gridPositions) {
    console.log(`Processing grid block - Day: ${block.day}, Period: ${block.period}`);
    console.log("Coordinates:", { x1: block.x1, y1: block.y1, x2: block.x2, y2: block.y2 });
    
    const width = block.x2 - block.x1;
    const height = block.y2 - block.y1;
    const cropped = image.clone().crop(block.x1, block.y1, width, height);
    const buffer = await cropped.getBufferAsync(Jimp.MIME_JPEG);

    let ocrResult = "";
    try {
      ocrResult = await performOCR(buffer, block);
    } catch (e) {
      console.error(`OCR error for Day: ${block.day}, Period: ${block.period}`, e);
    }
    console.log(`OCR result for Day: ${block.day}, Period: ${block.period}:\n`, ocrResult);

    if (ocrResult && ocrResult.trim().length > 0) {
      // Split lines and 제외 마지막 줄 (보통 시간 등)
      const lines = ocrResult.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
      const lectureNameCandidate = lines.slice(0, -1).join(" ");
      console.log(`Extracted lecture candidate for Day: ${block.day}, Period: ${block.period}:`, lectureNameCandidate);
      detectedBlocks.push({
        day: block.day,
        period: block.period,
        lectureNameCandidate,
      });
    } else {
      console.log(`No text detected for grid block: Day ${block.day}, Period ${block.period}`);
    }
  }
  console.log("All detected blocks:", JSON.stringify(detectedBlocks, null, 2));
  return detectedBlocks;
};

module.exports = { processImageAndExtractText };
