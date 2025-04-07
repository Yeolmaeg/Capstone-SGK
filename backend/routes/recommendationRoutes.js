const express = require("express");
const router = express.Router();
const controller = require("../controllers/recommendationController");

router.get("/", controller.getRecommendation);
router.post("/feedback", controller.saveFeedback);
router.post("/save", controller.saveRecommendation);
router.post("/recommendation/with-times", controller.recommendWithTravelTimes);
router.post("/schedule-from-recommendation", controller.createScheduleFromRecommendation);
router.post("/auto", controller.autoCreateScheduleFromRecommendation);


module.exports = router;
