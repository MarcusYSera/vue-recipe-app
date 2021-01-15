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
export const createPrimaryTables = () => executeQueryArray([createUserTable]);
export const insertPrimaryIntoTables = () => executeQueryArray([insertUsers]);
export const insertForeignIntoTables = () => executeQueryArray([insertMessages]);
export const addForeignKeys = () => executeQueryArray([createUserMessageForeignKey]);
