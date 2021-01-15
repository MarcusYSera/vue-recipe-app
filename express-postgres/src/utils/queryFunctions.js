import { pool } from '../models/pool';
import {
  dropUsersTable,
  dropMessagesTable,
  insertUsers,
  insertMessages,
  createUserTable,
  createMessageTable,
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
export const dropPrimaryKeyTables = () => executeQueryArray([dropUsersTable]);
export const createForeignKeyTables = () => executeQueryArray([createMessageTable]);
export const createPrimaryKeyTables = () => executeQueryArray([createUserTable]);
export const insertPrimaryIntoTables = () => executeQueryArray([insertUsers]);
export const insertForeignIntoTables = () => executeQueryArray([insertMessages]);
export const addForeignKeys = () => executeQueryArray([createUserMessageForeignKey]);
