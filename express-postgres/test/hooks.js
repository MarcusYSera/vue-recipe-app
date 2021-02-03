import {
  // dropPrimaryKeyTables,
  // dropForeignKeyTables,
  deleteTestValues,
  createPrimaryKeyTables,
  createForeignKeyTables,
  addForeignKeys,
  insertPrimaryIntoTables,
  insertForeignIntoTables,
} from '../src/utils/queryFunctions.js';

before(async () => {
  await createPrimaryKeyTables();
  await createForeignKeyTables();
  await addForeignKeys();
  await insertPrimaryIntoTables();
  await insertForeignIntoTables();
});

after(async () => {
  await deleteTestValues();
  //   await dropForeignKeyTables();
  //   await dropPrimaryKeyTables();
});
