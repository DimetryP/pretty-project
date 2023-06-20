require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.HOST,
  port: process.env.REDIS_PORT
});

redisClient.on('error', function(err) {
  console.log(err);
});

redisClient.on('connect', function(err) {
  console.log('Connected to redis sucessfully');
});

module.exports = { redisClient };
