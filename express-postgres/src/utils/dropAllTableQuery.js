import { dropForeignKeyTables, dropPrimaryKeyTables } from './queryFunctions';

(async () => {
  await dropForeignKeyTables();
  await dropPrimaryKeyTables();
})();
