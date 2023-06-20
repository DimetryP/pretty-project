const client = require('../database/database');

class Visitors {
  constructor() {}

  async getAllVisitors() {
     return await client.query('SELECT visitors.username, visitors.surname, visitors.patronymic, visitors.role_id FROM visitors LEFT JOIN visitor_roles ON visitors.role_id = visitor_roles.title ORDER BY visitors.username');
  }

  async getCurrentVisitor(id) {
     return await client.query('SELECT visitors.username, visitors.surname, visitors.patronymic, visitors.role_id, events.title_id, events.description, events.startTime, events.endTime FROM visitors LEFT JOIN events ON visitors.id = events.visitor_id WHERE visitors.id = $1 ORDER BY events.createDate', [id]);
  }
}

module.exports = { Visitors };
