const express = require('express');
const router = express.Router();
const { getUserPreferences, saveUserPreferences, removeUserPreferences } = require('../services/redisService');

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

// POST /api/preferences/:userId - 키워드 추가
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: 'keyword가 필요합니다.' });
  }

  try {
    await saveUserPreferences(userId, keyword);
    res.status(200).json({ message: `'${keyword}' 키워드 추가 완료` });
  } catch (err) {
    console.error('❗Redis 저장 오류:', err);
    res.status(500).json({ error: '키워드 저장 실패' });
  }
});

// DELETE - 키워드 삭제 (여러 개 가능)
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { keywords } = req.body;

  if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({ error: '삭제할 keywords 배열이 필요합니다.' });
  }

  try {
    await removeUserPreferences(userId, keywords);
    res.status(200).json({ message: `'${keywords.join(", ")}' 키워드 삭제 완료` });
  } catch (err) {
    console.error('❗Redis 삭제 오류:', err);
    res.status(500).json({ error: '키워드 삭제 실패' });
  }
});

module.exports = router;
