const user_role = "guardian" | "administrator";
const visitor_role = ["Worker", "Director", "Inspection"];

class UserModel {
  constructor(login, password, role) {
    this.login = login;
    this.password = password;
    this.role = role;
  }
}

class VisitorModel {
  constructor(id, username, surname, patronymic, visitor_role) {
    this.id = id;
    this.username = username;
    this.surname = surname;
    this.patronymic = patronymic;
    this.visitor_role = visitor_role;
  } 
}

class EventModel {
  constructor(id, title, description, startTime, endTime, created_at, user_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime; 
    this.created_at = created_at;
    this.user_id = user_id;
  }
}

module.exports = { UserModel, VisitorModel, EventModel };
