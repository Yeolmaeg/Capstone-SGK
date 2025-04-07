const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/scheduleController");

// 일정 관련
router.get("/schedule", scheduleController.getSchedules);       // 전체 일정 조회
router.get("/schedule/:id", scheduleController.getScheduleById); // 일정 하나 조회
router.post("/schedule", scheduleController.addSchedule);       // 일정 추가
router.delete("/schedule/:id", scheduleController.deleteSchedule); // 일정 삭제
router.put("/schedule/:id", scheduleController.updateSchedule);     // 일정 수정
router.patch("/schedule/:id", scheduleController.updateSchedule);


module.exports = router;
