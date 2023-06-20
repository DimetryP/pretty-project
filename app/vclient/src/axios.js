require('dotenv').config();
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.HOST,
  timeout: 30000,
  headers: {
    "X-Api-Key": process.env.VUE_APP_APIKEY
  }
});

export default instance;
