export const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    USER_ID INT GENERATED ALWAYS AS IDENTITY,
    FIRST_NAME VARCHAR DEFAULT '',
    LAST_NAME VARCHAR DEFAULT '',
    EMAIL VARCHAR DEFAULT '',
    PASSWORD VARCHAR DEFAULT '',
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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

export const createEventTable = `
  CREATE TABLE IF NOT EXISTS events (
    EVENT_ID INT GENERATED ALWAYS AS IDENTITY,
    USER_FKID INT,
    EVENT_NAME VARCHAR,
    EVENT_DATE DATE,
    EVENT_START_END VARCHAR,
    EVENT_TIME TIME,
    EVENT_COMPLETED_AT TIMESTAMPTZ,
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(EVENT_ID)
  );
`;

export const createUserEventForeignKey = `
  ALTER TABLE events
  ADD FOREIGN KEY (USER_FKID)
  REFERENCES users(USER_ID);
`;

export const insertEvents = `
  INSERT INTO events(USER_FKID, EVENT_NAME, EVENT_DATE, EVENT_START_END, EVENT_TIME)
  VALUES (55, 'Pizza', '2021-01-30', '' )
`;

export const createUpdateTriggerFunction = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

export const createUpdateTrigger = `
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
`;
