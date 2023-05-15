require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const client = require('./database');
const { redisClient, SessionStore } = require('./redis/redis');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(SessionStore);
app.use('/', router);

const server = app.listen(process.env.APP_PORT, async () => {
  console.log(`Server listen at ${process.env.APP_PORT} port`);

  await redisClient.connect();

  client.connect().then(() => console.log('Database had been connected !:)')).catch(e => console.log(`${e} :(`));
});

module.exports = app;
