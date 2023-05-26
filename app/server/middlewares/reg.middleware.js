const client = require('../database/database');

const checkUserRegData = function(req, res, next) {
  const { login, password } = req.body;

  if(login.length > 10) {
      res.send('Login need to be length less than or equals 10');
  }

  if(password.length > 12) {
      res.send('Password need to be length less than or equals 12');
  }

  next();
}

const checkUserLoginReg = async function(req, res, next) {
  const { login } = req.body;
 
  const result = await client.query('SELECT login FROM users WHERE login = $1', [login]);
 
  if(result.rows[0] === undefined) {
    next();
  } else {
    res.send('That user has account in application!');
  }
}

module.exports = { checkUserRegData, checkUserLoginReg };
