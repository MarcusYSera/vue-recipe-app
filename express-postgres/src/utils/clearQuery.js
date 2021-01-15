import { dropForeignKeyTables, dropTables } from './queryFunctions';

(async () => {
  await dropForeignKeyTables();
  await dropTables();
})();
