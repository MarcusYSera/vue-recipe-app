import { createTables, insertIntoTables, insertForeignKeys } from './queryFunctions';

(async () => {
  await createTables();
  await insertForeignKeys()
  await insertIntoTables();
})();
