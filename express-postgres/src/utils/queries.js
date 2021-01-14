export const createUserTable = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR DEFAULT '',
    last_name VARCHAR DEFAULT '',
    email VARCHAR DEFAULT '',
    password VARCHAR DEFAULT '',
    PRIMARY KEY(user_id)
  )
  `;

export const insertUsers = `
    INSERT INTO users(first_name, last_name, email, password)
    VALUES ('maiko', 'imazawa', 'maiko@gmail.com', '1205'), ('markie', 'sera', 'msera@gmail.com', '0208')
`;

export const dropUsersTable = 'DROP TABLE users';

export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  message_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  message VARCHAR NOT NULL,
  PRIMARY KEY(message_id)
  )
  `;

export const createUserMessageForeignKey = `
alter table messages add foreign key (user_id) REFERENCES users(user_id);
`;

export const insertMessages = `
  INSERT INTO messages(message, user_id)
  VALUES ('first message', 1),
  ('second message',)
  `;

export const dropMessagesTable = 'DROP TABLE messages';
