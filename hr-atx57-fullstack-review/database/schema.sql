DROP DATABASE IF EXISTS repo_list;
CREATE DATABASE repo_list;

USE repo_list;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY,
  avatar_url VARCHAR(100),
  username VARCHAR(30) NOT NULL
);

CREATE TABLE repos (
  id INT NOT NULL PRIMARY KEY,
  repo_name VARCHAR(30) NOT NULL,
  repo_desc VARCHAR(1000),
  repo_url VARCHAR(100),
  fork_count INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (id)
);