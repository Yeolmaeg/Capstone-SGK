const express = require("express");
const router = express.Router();
const controller = require("../controllers/autoScheduleController");

// 프론트가 장소명 전달해주면 해당 장소 perplexity에서 수집하고
// 사용자의 동선과 빈 시간대(1시간 이상 공백)으로 고려해서 자동으로 일정 추가
router.post("/auto-schedule", controller.autoAddFromPlaceName);

module.exports = router;
