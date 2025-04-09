const express = require('express');
const router = express.Router();
const { generateSchedulesForSemester } = require('../services/scheduleGenerator');

// 예시: POST /generate
router.post('/generate', async (req, res) => {
  try {
    const { userId, semesterStart, semesterEnd } = req.body;
    const schedules = await generateSchedulesForSemester(userId, semesterStart, semesterEnd);
    res.json({ schedules });
  } catch (error) {
    console.error('Error generating schedules:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
