CREATE TABLE `users` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(255) DEFAULT NULL,
 `password` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);