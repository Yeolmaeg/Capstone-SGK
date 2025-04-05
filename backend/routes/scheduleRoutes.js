const express = require("express");
const router = express.Router();
const controller = require("../controllers/scheduleController");

router.get("/schedule", controller.getSchedules);       // 전체 일정 조회
router.get("/schedule/:id", controller.getScheduleById); // 일정 하나 조회
router.post("/schedule", controller.addSchedule);       // 일정 추가
router.delete("/schedule/:id", controller.deleteSchedule); // 일정 삭제
router.put("/schedule/:id", controller.updateSchedule);     // 일정 수정
router.patch("/schedule/:id", controller.updateSchedule);
// router.post("/schedule/from-recommendation", controller.addScheduleFromRecommendation); // 일정 추천


module.exports = router;
