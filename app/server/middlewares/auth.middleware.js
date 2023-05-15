const bcrypt = require('bcrypt');
const client = require('../database');
const clientRedis = require('../redis/redis');

const userCheckAuthData = async function(req, res, next) {
  const { login, password } = req.body;  
  
  try {
    const data = await client.query('SELECT * FROM users WHERE login = $1', [login]);
    const log = data.rows[0].login;

    if(log !== login) { res.send("Login isn't correct or that user hasn't account in application"); }

    await checkPasswordAuth(password, data.rows[0].password).then(result => { if(result !== true) res.send("Password isn't correct"); });

    req.userdata = data;

    next();
  } catch(e) {
    res.send("That user is not defined in application");
  }
}

const userCheckRole = async function(req, res, next) {
  console.log('My role is: .....');

  next();
}

async function checkPasswordAuth(enterPassword, fromDBPassword) {
  return await bcrypt.compare(enterPassword, new Buffer.from(fromDBPassword).toString());
}

module.exports = { userCheckAuthData, userCheckRole }; 
