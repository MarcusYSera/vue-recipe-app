export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR DEFAULT '',
  message VARCHAR NOT NULL
  )
  `;

export const insertMessages = `
  INSERT INTO messages(name, message)
  VALUES ('chidimo', 'first message'),
  ('orji', 'second message')
  `;

export const dropMessagesTable = 'DROP TABLE messages';

export const createUserTable = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR DEFAULT '',
    last_name VARCHAR DEFAULT '',
    email VARCHAR DEFAULT '',
    password VARCHAR DEFAULT ''
  )
  `;

export const insertUsers = `
    INSERT INTO users(first_name, last_name, email, password)
    VALUES ('maiko', 'imazawa', 'maiko@gmail.com', '1205')
`;

export const dropUsersTable = 'DROP TABLE users';
