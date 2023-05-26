const client = require('../database/database');

class Events {
  constructor() {}

  async getEvents() {
    return await client.query('SELECT events.title_id, events.description, events.starttime, events.endtime, events.createdate FROM events');
  }

  getEvent(id) {
    console.log(id);
  }

  async addEvent(event) {
     const f = await client.query('INSERT INTO events');
  }
}

module.exports = { Events };
