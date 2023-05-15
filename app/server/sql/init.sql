CREATE TYPE user_role AS ENUM ('administrator', 'guardian');

CREATE TABLE users(
  id SMALLSERIAL PRIMARY KEY,
  login VARCHAR(10) NOT NULL,
  password bytea NOT NULL,
  user_role user_role NOT NULL DEFAULT 'guardian'
);

CREATE TABLE event_types(
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL
);

CREATE TABLE events(
  id BIGINT UNIQUE PRIMARY KEY,
  title_id INT NOT NULL,
  description VARCHAR(255),
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  createDate DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY(title_id) REFERENCES event_types(id),
  user_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE visitor_roles(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE visitors(
  id BIGINT UNIQUE PRIMARY KEY,
  username TEXT NOT NULL,
  surname TEXT NOT NULL,
  patronymic TEXT,
  role_id INT NOT NULL,
  FOREIGN KEY(role_id) REFERENCES visitor_roles(id)
);

CREATE TABLE events_visitors(
  visitor_id BIGINT,
  event_id BIGINT,
  PRIMARY KEY(visitor_id, event_id),
  CONSTRAINT fk_visitor FOREIGN KEY(visitor_id) REFERENCES visitors(id),
  CONSTRAINT fk_event FOREIGN KEY(event_id) REFERENCES events(id)
);

INSERT INTO visitor_roles (title) VALUES ('worker'), ('guardian'), ('zam_director'), ('inspection');

INSERT INTO event_types (title) VALUES ('Go to Director'), ('Go to work'), ('Check office'), ('Labor inspection');
