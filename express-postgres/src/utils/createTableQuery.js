import { createPrimaryKeyTables, createForeignKeyTables, addForeignKeys } from './queryFunctions';

(async () => {
  await createPrimaryKeyTables();
  await createForeignKeyTables();
  await addForeignKeys();
})();
