require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: process.env.REDIS_PORT
});

redisClient.on('error', function(err) {
  console.log(err);
});

redisClient.on('connect', function(err) {
  console.log('Connected to redis sucessfully');
});

module.exports = { redisClient };
