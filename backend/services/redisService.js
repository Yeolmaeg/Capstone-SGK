const redis = require('./redisClient');

async function getUserPreferences(userId) {
  const key = `user:${userId}:preferences`;
  const keywords = await redis.smembers(key);
  return keywords;
}

async function saveUserPreferences(userId, keywords) {
  const key = `user:${userId}:preferences`;
  await redis.sadd(key, ...keywords);
}


module.exports = { saveUserPreferences, getUserPreferences };
