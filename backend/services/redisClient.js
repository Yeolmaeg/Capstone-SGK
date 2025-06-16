console.log("🔍 REDIS_HOST:", process.env.REDIS_HOST);
console.log("🔍 REDIS_PORT:", process.env.REDIS_PORT);
console.log("🔍 REDIS_PASSWORD:", process.env.REDIS_PASSWORD ? 'exists' : 'missing');


const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❗Redis error:', err);
});

module.exports = redis;
