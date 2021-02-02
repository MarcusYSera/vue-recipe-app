import {
  dropPrimaryKeyTables,
  dropForeignKeyTables,
  createPrimaryKeyTables,
  createForeignKeyTables,
  addForeignKeys,
  insertPrimaryIntoTables,
  insertForeignIntoTables,
} from '../src/utils/queryFunctions';

before(async () => {
  await createPrimaryKeyTables();
  await createForeignKeyTables();
  await addForeignKeys();
  await insertPrimaryIntoTables();
  await insertForeignIntoTables();
});

// after(async () => {
//   await dropForeignKeyTables();
//   await dropPrimaryKeyTables();
// });
