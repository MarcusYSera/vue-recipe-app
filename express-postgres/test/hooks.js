import {
  dropPrimaryKeyTables,
  dropForeignKeyTables,
  // deleteTestValues,
  createPrimaryKeyTables,
  createForeignKeyTables,
  addForeignKeys,
  insertPrimaryIntoTables,
  insertForeignIntoTables,
  createTriggerFunctions,
  associateUpdateTriggerToTables,
} from '../src/utils/queryFunctions.js';

before(async () => {
  await createTriggerFunctions();
  await createPrimaryKeyTables();
  await createForeignKeyTables();
  await addForeignKeys();
  await associateUpdateTriggerToTables();
  await insertPrimaryIntoTables();
  await insertForeignIntoTables();
});

after(async () => {
  // await deleteTestValues();
  await dropForeignKeyTables();
  await dropPrimaryKeyTables();
});
