const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // 기존 multer 설정 불러오기
const { processImageAndExtractText } = require("../services/imageProcessor");
const { matchLectures } = require("../services/lectureMatcher");

// POST /api/class-schedule/upload
// 클라이언트가 업로드한 이미지 파일을 처리하여 강의 일정을 반환합니다.
router.post("/class-schedule/upload", upload.single("image"), async (req, res) => {
  console.log("Received upload request. File info:", req.file);
  try {
    const imagePath = req.file.path;
    console.log("Starting processing for image at:", imagePath);
    const detectedBlocks = await processImageAndExtractText(imagePath);
    console.log("Detected blocks:", detectedBlocks);
    const finalLectures = await matchLectures(detectedBlocks);
    console.log("Returning final lectures:", finalLectures);
    res.json({ lectures: finalLectures });
  } catch (error) {
    console.error("Error in schedule generation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
