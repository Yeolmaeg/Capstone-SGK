const db = require('../lib/db'); 
const { handlePositiveScheduleFeedback } = require('../services/feedbackService');

async function saveFeedback(req, res) {
  const { userId, scheduleId, satisfied } = req.body;
  console.log("📥 받은 피드백 요청:", { userId, scheduleId, satisfied });

  try {
    // 1. schedule에서 place_id, source 확인
    const result = await db.query(
      'SELECT place_id, source FROM schedules WHERE id = $1',
      [scheduleId]
    );

    const schedule = result.rows[0];
    if (!schedule) {
      return res.status(404).json({ error: '해당 일정(schedule)을 찾을 수 없습니다.' });
    }

    // 2. satisfied 업데이트
    await db.query(
      'UPDATE schedules SET satisfied = $1 WHERE id = $2',
      [satisfied, scheduleId]
    );

    // 3. 추천 일정이면 긍정 피드백 처리
    if ((satisfied === true || satisfied === 'true') && schedule.source === 'recommendation') {
      await handlePositiveScheduleFeedback(userId, schedule.place_id);
    }

    res.status(200).json({ message: '피드백 저장 완료' });
  } catch (error) {
    console.error('❗피드백 저장 중 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
}

module.exports = { saveFeedback };
