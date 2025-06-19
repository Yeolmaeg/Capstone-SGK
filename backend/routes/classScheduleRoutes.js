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
    console.log("🌐 Image URL for Vision API:", imageUrl);

    // ✅ OCR 처리 (버퍼 제거)
    const detectedBlocks = await processImageAndExtractText(imageUrl);

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
