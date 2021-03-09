// Create Functions

// Create Primary Key Table

// Create Foreign Key Table

// Make Foreign Key association

// create the trigger

// insert values, starting with primary key tables first, then foreign key tables

// To delete, drop foreign key tables first, then primary key values

export const createUpdateTriggerFunction = `
  CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;

export const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    USER_ID INT GENERATED ALWAYS AS IDENTITY,
    FIRST_NAME VARCHAR DEFAULT '',
    LAST_NAME VARCHAR DEFAULT '',
    EMAIL VARCHAR DEFAULT '',
    PASSWORD VARCHAR DEFAULT '',
    JWT_REFRESH_TOKEN VARCHAR DEFAULT '',
    JWT_EXPIRES_AT VARCHAR DEFAULT '',
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(USER_ID)
  );
`;

export const createUpdateTriggerForUsers = `
  DROP TRIGGER IF EXISTS set_timestamp_updated_at_users ON users;
  CREATE TRIGGER set_timestamp_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
`;

export const insertUsers = `
  INSERT INTO users(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD)
  VALUES ('maiko', 'imazawa', 'maiko@gmail.com', '1205'),
    ('markie', 'sera', 'msera@gmail.com', '0208');
`;

export const dropUsersTable = 'DROP TABLE IF EXISTS users;';

export const createMessageTable = `
  CREATE TABLE IF NOT EXISTS messages (
    MESSAGE_ID INT GENERATED ALWAYS AS IDENTITY,
    USER_ID INT,
    MESSAGE VARCHAR NOT NULL,
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(MESSAGE_ID),
    CONSTRAINT user_id
      FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
  );
`;

export const createUpdateTriggerForMessages = `
  DROP TRIGGER IF EXISTS set_timestamp_updated_at_messages ON messages;
  CREATE TRIGGER set_timestamp_updated_at_messages
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
`;

export const insertMessages = `
  INSERT INTO messages(USER_ID, MESSAGE)
  VALUES (1,'first message'),
  (2,'second message');
`;

export const dropMessagesTable = 'DROP TABLE IF EXISTS messages;';

export const createEventTable = `
  CREATE TABLE IF NOT EXISTS events (
    EVENT_ID INT GENERATED ALWAYS AS IDENTITY,
    USER_ID INT,
    EVENT_NAME VARCHAR,
    EVENT_ASSOCIATE_RECIPE VARCHAR,
    EVENT_DESCRIPTION TEXT,
    EVENT_START TIMESTAMPTZ,
    EVENT_END TIMESTAMPTZ,
    EVENT_DURATION INTERVAL,
    EVENT_COMPLETED_AT TIMESTAMPTZ,
    CREATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UPDATED_AT TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(EVENT_ID),
    CONSTRAINT user_id
      FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
  );
`;

export const createUpdateTriggerForEvents = `
  DROP TRIGGER IF EXISTS set_timestamp_updated_at_events ON events;
  CREATE TRIGGER set_timestamp_updated_at_events
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
`;

export const insertEvents = `
  INSERT INTO events(USER_ID, EVENT_NAME, EVENT_ASSOCIATE_RECIPE, EVENT_DESCRIPTION, EVENT_START, EVENT_END, EVENT_DURATION)
  VALUES (1, 'Pizza', 'pizza', 'making pizza today', '2021-02-06T06:49:00.000Z', '2021-02-06T18:19:00.000Z', '11:30'), 
  (2, 'Pie', 'pie', 'making a pie today', '2021-02-06T06:49:00.000Z', '2021-02-06T14:49:00.000Z', '08:00');
`;

export const updateEvents = `
  UPDATE events
  SET EVENT_COMPLETED_AT = NOW ()
  WHERE EVENT_NAME = 'Pizza'
  RETURNING *;
`;

// export const deleteTestValuesUsers = `
//   DELETE FROM users
//   WHERE email IN ('maiko@gmail.com', 'msera@gmail.com');
// `;

export const deleteTestValuesMessages = `
  DELETE FROM messages
  WHERE USER_ID IN (1,2);
`;

export const deleteTextValuesEvents = `
  DELETE FROM events
  WHERE USER_ID IN (1,2);
`;

export const dropEventsTable = 'DROP TABLE IF EXISTS events;';
