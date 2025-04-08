const express = require('express');
const router = express.Router();
const { getUserPreferences } = require('../services/redisService');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const preferences = await getUserPreferences(userId);
    res.status(200).json({ userId, preferences });
  } catch (err) {
    console.error('❗Redis 조회 오류:', err);
    res.status(500).json({ error: 'Redis 조회 실패' });
  }
});

module.exports = router;
