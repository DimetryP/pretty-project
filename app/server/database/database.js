require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.HOST,
    port: process.env.PG_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
});

module.exports = client;
