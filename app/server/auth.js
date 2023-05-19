const bcrypt = require('bcrypt');
const client = require('./database');
const { redisClient } = require('./redis/redis');

class Auth {
  async authorization(user) {
    console.log(user);
  }

  async registration(user) {
    const secPassword = bcrypt.hashSync(user.getPassword, 7);

    await client.query('INSERT INTO users(login, password) VALUES($1, $2)', [user.getLogin, secPassword]);
  }

  async logout(login) {
    return await redisClient.del(`session_${login}`);
  }
}

module.exports = { Auth };
