const { execFile } = require('node:child_process');
const client = require('./database');


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

  destroyEvents() {
     const myShellScript = execFile('clear_events.sh', { encoding: 'us-ascii' }, (err, stdout, stderr) => {
       if(error) throw error;

       console.log(stdout);
     }); 
  }
}

module.exports = { Events };
