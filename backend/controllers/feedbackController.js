const db = require('../lib/db'); 
const { handlePositiveRecommendationFeedback } = require('../services/feedbackService');

async function saveFeedback(req, res) {
  const { userId, recommendationId, satisfied } = req.body;
  console.log("📥 받은 피드백 요청:", { userId, recommendationId, satisfied });
  try {
    // 1. DB에 satisfied 값 업데이트
    await db.query(
      'UPDATE recommendations SET satisfied = $1 WHERE id = $2',
      [satisfied, recommendationId]
    );

    // 2. 만족한 경우 GPT로 키워드 추출 후 Redis 저장
    if (satisfied === true || satisfied === 'true') {
      await handlePositiveRecommendationFeedback(userId, recommendationId);
    }

    res.status(200).json({ message: '피드백 저장 완료' });
  } catch (error) {
    console.error('❗피드백 저장 중 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
}

module.exports = { saveFeedback };
