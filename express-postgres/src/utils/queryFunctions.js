import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
  insertUsers,
  dropUsersTable,
  createUserTable,
  createUserMessageForeignKey,
} from './queries';

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

export const dropForeignKeyTables = () => executeQueryArray([dropMessagesTable]);
export const dropTables = () => executeQueryArray([dropUsersTable]);
export const createForeignTables = () => executeQueryArray([createMessageTable]);
export const createTables = () => executeQueryArray([createUserTable]);
export const insertIntoTables = () => executeQueryArray([insertMessages, insertUsers]);
export const insertForeignKeys = () => executeQueryArray([createUserMessageForeignKey]);
