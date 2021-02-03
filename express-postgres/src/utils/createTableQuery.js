import {
  createTriggerFunctions,
  createPrimaryKeyTables,
  createForeignKeyTables,
  addForeignKeys,
  associateUpdateTriggerToTables,
} from './queryFunctions.js';

(async () => {
  await createTriggerFunctions();
  await createPrimaryKeyTables();
  await createForeignKeyTables();
  await addForeignKeys();
  await associateUpdateTriggerToTables();
})();
