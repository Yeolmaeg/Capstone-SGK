const express = require("express");
const router = express.Router();
const axios = require("axios"); // S3 이미지 다운로드
const upload = require("../middlewares/upload"); // S3 기반 multer
const { processImageAndExtractText } = require("../services/imageProcessor");
const { matchLectures } = require("../services/lectureMatcher");

router.post("/class-schedule/upload", upload.single("image"), async (req, res) => {
  console.log("📥 Received upload request. File info:", req.file);

  try {
    const imageUrl = req.file.location; // ✅ S3 URL
    console.log("🌐 Downloading image from:", imageUrl);

    // ✅ S3 이미지 → Buffer
    const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");

    // ✅ OCR 처리
    const detectedBlocks = await processImageAndExtractText(imageBuffer);

    // ✅ 강의 추출
    const finalLectures = await matchLectures(detectedBlocks);

    console.log("✅ Returning final lectures:", finalLectures);
    res.json({ lectures: finalLectures });
  } catch (error) {
    console.error("❌ Error in schedule generation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
