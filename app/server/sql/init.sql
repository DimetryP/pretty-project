CREATE TYPE user_role AS ENUM ('administrator', 'guardian');

CREATE TABLE users(
  id SMALLSERIAL PRIMARY KEY,
  login VARCHAR(10) UNIQUE NOT NULL,
  password bytea NOT NULL,
  user_role user_role NOT NULL DEFAULT 'guardian'
);

CREATE TABLE event_types(
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

CREATE TABLE visitor_roles(
  id SMALLSERIAL PRIMARY KEY,
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

CREATE TABLE events(
  id BIGINT UNIQUE PRIMARY KEY,
  title_id INT NOT NULL REFERENCES event_types(id) ON DELETE CASCADE,
  description VARCHAR(255),
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  createDate DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id INT REFERENCES users(id) NOT NULL,
  visitor_id INT REFERENCES visitors(id)
);

INSERT INTO visitor_roles (title) VALUES ('worker'), ('guardian'), ('zam_director'), ('inspection');

INSERT INTO event_types (title) VALUES ('Go to Director'), ('Go to work'), ('Check office'), ('Labor inspection');
