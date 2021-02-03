import {
  insertPrimaryIntoTables,
  insertForeignIntoTables,
  updateForeignKeyTable,
} from './queryFunctions.js';

(async () => {
  await insertPrimaryIntoTables();
  await insertForeignIntoTables();
  await updateForeignKeyTable();
})();
