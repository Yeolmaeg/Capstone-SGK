const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

(async () => {
  try {
    await redis.set("connection_test", "ok");
    const result = await redis.get("connection_test");
    if (result === "ok") {
      console.log("✅ Redis connected and operational");
    } else {
      console.warn("⚠️ Redis connected but ping test failed");
    }
  } catch (err) {
    console.error("❗ Redis connection failed:", err);
  }
})();

module.exports = redis;
