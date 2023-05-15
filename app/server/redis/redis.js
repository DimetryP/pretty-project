require('dotenv').config();
const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');

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

const RedisStore = connectRedis(session);

const SessionStore = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.REDIS_PASSWORD,
  resave: true,
  saveUnitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600 * 5
  }
});

module.exports = { redisClient, SessionStore };
