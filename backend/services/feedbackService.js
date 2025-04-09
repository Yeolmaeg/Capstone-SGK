const { getPlaceIdFromRecommendation } = require('./recommendationService');
const { getPlaceDescriptionById } = require('./placeService');
const { extractKeywords } = require('./gptService');
const { saveUserPreferences } = require('./redisService');

async function handlePositiveRecommendationFeedback(userId, recommendationId) {
    const placeId = await getPlaceIdFromRecommendation(recommendationId);
    if (!placeId) {
      console.log("❗ recommendationId에 해당하는 placeId 없음");
      return;
    }
  
    const description = await getPlaceDescriptionById(placeId);
    if (!description) {
      console.log("❗ placeId에 해당하는 description 없음");
      return;
    }
  
    const keywords = await extractKeywords(description);
    console.log("🧠 GPT 추출 키워드:", keywords);
  
    await saveUserPreferences(userId, keywords);
    console.log("📌 Redis 저장 완료:", `user:${userId}:preferences →`, keywords);
  }


  module.exports = {
    handlePositiveRecommendationFeedback,
  };
