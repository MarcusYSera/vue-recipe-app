import { insertPrimaryIntoTables, insertForeignIntoTables } from './queryFunctions';

(async () => {
  await insertPrimaryIntoTables();
  await insertForeignIntoTables();
})();
