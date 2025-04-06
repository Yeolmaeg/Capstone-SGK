const Redis = require('ioredis');

const redis = new Redis({
  host:  process.env.REDIS_HOST || 'redis',
  port: 6379, 
  password: null,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis;
