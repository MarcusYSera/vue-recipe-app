import { dropForeignKeyTables, dropPrimaryKeyTables } from './queryFunctions.js';

(async () => {
  await dropForeignKeyTables();
  await dropPrimaryKeyTables();
})();
