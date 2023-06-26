const { exec } = require('child_process');
const client = require('../database/database');

class Events {
  constructor() {}

  async getEvents(user_id, date) {
    return await client.query('SELECT events.title_id, events.description, events.startTime, events.endTime, events.createdate FROM events WHERE events.craetedate = $1 AND events.user_id = $2', [date, user_id]);
  }

  async getCurrentEvent(user_id, id) {
    return await client.query('SELECT events.id events.title_id, events.description, events.startTime, events.endTime, events.createdate, visitors.username, visitors.surname, visitors.patronymic, visitors.visitor_role  FROM events LEFT JOIN events_title ON events.title_id = events_title.id LEFT JOIN users ON events.user_id = $1 LEFT JOIN visitors ON events.visitor_id = visitors.id WHERE events.id = $2', [user_id, id]);
  }

  async addEvent(visitor, event) {
     const visitor_id = await client.query('SELECT visitor.id FROM visitors LEFT JOIN visitor_roles ON visitor.role_id = visitor_roles.id WHERE visitors.username = $1 AND surname = $2 AND patronymic = $3 AND role_id = $4', [visitor.username, visitor.surname, visitor.patronymic, visitor.vis_role]);
     const event_types_id = await client.query('SELECT event_types.id FROM event_types WHERE event_types.title = $1', [title]);

     await client.query('INSERT INTO events (title_id, description, startTime, endTime, visitor_id) VALUES ($1, $2, $3, $4, $5)', [event_types_id, event.description, event.startTime, event.endTime,  visiter_id]);
  }

  deleteDbDataAfter3Years() {
     let time = new Date();

     const expression = `${time.getDate()}:${time.getMonth()+1}:${time.getFullYear()}`;

     if(expression != "26:6:2023") { console.log('I can"t delete my data from database :)') }

     exec("bash ../sql/drop_events_table.sql", (error, stdout, stderr) => {
         if (error) {
             console.log(`error: ${error.message}`);
             return;
         }
         if (stderr) {
             console.log(`stderr: ${stderr}`);
             return;
         }
         console.log(`stdout: ${stdout}`);
     });
  }
}

module.exports = { Events };
