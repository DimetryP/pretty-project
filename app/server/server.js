require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const client = require('./database/database');
const { redisClient } = require('./redis/redis');

const app = express();

const corsOptions = {
  origin: process.env.HOST,
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', router);

const server = app.listen(process.env.APP_PORT, async () => {
  console.log(`Server listen at ${process.env.APP_PORT} port`);

  await redisClient.connect();

  client.connect().then(() => console.log('Database had been connected !:)')).catch(e => console.log(`${e} :(`));
});

module.exports = app;
