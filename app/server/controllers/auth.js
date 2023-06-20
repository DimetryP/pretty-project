const bcrypt = require('bcrypt');
const client = require('../database/database');
const { redisClient } = require('../redis/redis');

class Auth {
  async registration(user) {
    const secPassword = bcrypt.hashSync(user.getPassword, 7);

    await client.query('INSERT INTO users(login, password) VALUES($1, $2)', [user.login, secPassword]);
  }

  async logout(login) {
    return await redisClient.del(`session_${login}`);
  }

  async delete_account(login) {
    await redisClient.del(`session_${login}`);

    await client.query('DELETE FROM users WHERE login = $1', [login]);

    return login;
  }

  async updatePassword(login, password) {
    await client.query('UPDATE users SET password = $1 WHERE login = $2', [password, login]);
  }

  async updateLogin(newLogin, login) {
    await client.query('UPDATE users SET login = $1 WHERE login = $2', [newLogin, login]);

    await redisClient.set(`session_${login}`, newLogin);
  }
}

module.exports = { Auth };
