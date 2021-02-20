import { pool } from '../models/pool.js';
import {
  createUpdateTriggerFunction,
  createUserTable,
  createMessageTable,
  createEventTable,
  // createUserMessageForeignKey,
  // createUserEventForeignKey,
  createUpdateTriggerForUsers,
  createUpdateTriggerForMessages,
  createUpdateTriggerForEvents,
  insertUsers,
  insertMessages,
  insertEvents,
  updateEvents,
  deleteTestValuesMessages,
  deleteTextValuesEvents,
  dropEventsTable,
  dropMessagesTable,
  dropUsersTable,
} from './queries.js';

export const executeQueryArray = async (arr) => {
  return new Promise((resolve, reject) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });
};

export const createTriggerFunctions = () => executeQueryArray([createUpdateTriggerFunction]);

export const createPrimaryKeyTables = () => executeQueryArray([createUserTable]);
export const createForeignKeyTables = () =>
  executeQueryArray([createMessageTable, createEventTable]);

// export const addForeignKeys = () =>
//   executeQueryArray([createUserMessageForeignKey, createUserEventForeignKey]);

export const associateUpdateTriggerToTables = () =>
  executeQueryArray([
    createUpdateTriggerForUsers,
    createUpdateTriggerForMessages,
    createUpdateTriggerForEvents,
  ]);

export const insertPrimaryIntoTables = () => executeQueryArray([insertUsers]);
export const insertForeignIntoTables = () => executeQueryArray([insertMessages, insertEvents]);

export const updateForeignKeyTable = () => executeQueryArray([updateEvents]);

export const deleteTestValues = () =>
  executeQueryArray([deleteTestValuesMessages, deleteTextValuesEvents]);

export const dropForeignKeyTables = () => executeQueryArray([dropMessagesTable, dropEventsTable]);
export const dropPrimaryKeyTables = () => executeQueryArray([dropUsersTable]);
