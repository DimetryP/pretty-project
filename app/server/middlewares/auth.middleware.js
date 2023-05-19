const bcrypt = require('bcrypt');
const client = require('../database');
const { redisClient } = require('../redis/redis');

const userCheckAuthData = async function(req, res, next) {
  const { login, password } = req.body;  
  
  try {
    const data = await client.query('SELECT * FROM users WHERE login = $1', [login]);
    const log = data.rows[0].login;
    const pass = data.rows[0].password;

    if(log !== login) { res.send("Login isn't correct or that user hasn't account in application"); }

    await checkPasswordAuth(password, pass).then(result => { if(result !== true) res.send("Password isn't correct"); });

    req.userdata = data;

    await saveUserSession(log, `${log}:${pass}`);

    next();
  } catch(e) {
    res.send("That user is not defined in application");
  }
}

const userCheckIsAdministrator = async function(req, res, next) {
  const { login } = req.userdata.rows[0];

  const session = await redisClient.get(`session:${login}`);

  if(session.split(':')[1] !== "administrator") { res.send("You haven't 'administrator' role to admit that function"); }
 
  next();
}

const userCheckIsAuthorized = async function(req, res, next) {
  const { login } = req.body;

  const session = await redisClient.get(`session:${login}`);
  const session_login = session.split(':')[0];

  if(!session_login) res.send("User not authorized in application");

  next();
}

async function saveUserSession(id, data) {
  const payload = await redisClient.get(`session:${id}`);

  if(!payload) await redisClient.set(`session:${id}`, data, { EX: 1000 * 60 * 60 * 5 });
}

async function checkPasswordAuth(enterPassword, fromDBPassword) {
  return await bcrypt.compare(enterPassword, new Buffer.from(fromDBPassword).toString());
}

module.exports = { userCheckAuthData, userCheckIsAdministrator, userCheckIsAuthorized }; 
