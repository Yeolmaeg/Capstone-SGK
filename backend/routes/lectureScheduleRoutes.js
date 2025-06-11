const express = require('express');
const router = express.Router();
const { generateSchedulesForSemester } = require('../services/scheduleGenerator');
const pool = require('../lib/db'); // DB 연결

// 예시: POST /api/lecture-schedules/generate
router.post('/generate', async (req, res) => {
  try {
     const { userId, semesterStart, semesterEnd, lectures } = req.body;
    const schedules = await generateSchedulesForSemester(
      userId,
      semesterStart,
      semesterEnd,
      lectures // ✅ 프론트에서 온 OCR lectures가 있으면 그것만 사용
    );
    res.json({ schedules });
  } catch (error) {
    console.error('Error generating schedules:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 일정 조회: GET /api/lecture-schedules/user/:userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM lecture_schedules WHERE user_id = $1 ORDER BY start_time ASC`,
      [userId]
    );
    res.json({ schedules: result.rows });
  } catch (err) {
    console.error("Error fetching schedules:", err);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

module.exports = router;
