import { createPrimaryTables, createForeignTables, addForeignKeys } from './queryFunctions';

(async () => {
  await createPrimaryTables();
  await createForeignTables();
  await addForeignKeys();
})();
