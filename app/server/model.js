const user_role = "guardian" | "administrator";

class User {
  constructor(login, password, role) {
    this.login = login;
    this.password = password;
    this.role = role;
  }

  get getLogin() {
    return this.login;
  }

  get getPassword() {
    return this.password;
  }

  get getRole() {
    return this.role;
  }
}

class Visitor {
  constructor(id, username, surname, patronymic, visitor_role) {
    this.id = id;
    this.username = username;
    this.surname = surname;
    this.patronymic = patronymic;
    this.visitor_role = visitor_role;
  }
}

class Event {
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

module.exports = { User, Visitor, Event };
