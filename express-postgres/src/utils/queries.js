export const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    USER_ID INT GENERATED ALWAYS AS IDENTITY,
    FIRST_NAME VARCHAR DEFAULT '',
    LAST_NAME VARCHAR DEFAULT '',
    EMAIL VARCHAR DEFAULT '',
    PASSWORD VARCHAR DEFAULT '',
    PRIMARY KEY(USER_ID)
  );
  `;

export const insertUsers = `
  INSERT INTO users(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD)
  VALUES ('maiko', 'imazawa', 'maiko@gmail.com', '1205'),
    ('markie', 'sera', 'msera@gmail.com', '0208');
`;

export const dropUsersTable = 'DROP TABLE users;';

export const createMessageTable = `
  CREATE TABLE IF NOT EXISTS messages (
    MESSAGE_ID INT GENERATED ALWAYS AS IDENTITY,
    USER_FKID INT,
    MESSAGE VARCHAR NOT NULL,
    PRIMARY KEY(MESSAGE_ID)
  );
`;

export const createUserMessageForeignKey = `
  ALTER TABLE messages
  ADD FOREIGN KEY (USER_FKID)
  REFERENCES users(USER_ID);
`;

export const insertMessages = `
  INSERT INTO messages(USER_FKID, MESSAGE)
  VALUES (1,'first message'),
  (2,'second message');
  `;

export const dropMessagesTable = 'DROP TABLE messages;';
