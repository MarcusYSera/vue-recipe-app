import {
  createTables,
  createForeignTables,
  insertIntoTables,
  insertForeignKeys,
} from './queryFunctions';

(async () => {
  await createTables();
  await createForeignTables();
  await insertForeignKeys();
  await insertIntoTables();
})();
