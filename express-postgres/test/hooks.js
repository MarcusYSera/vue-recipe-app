import {
  dropTables,
  dropForeignKeyTables,
  createTables,
  createForeignTables,
  insertIntoTables,
  insertForeignKeys,
} from '../src/utils/queryFunctions';

before(async () => {
  await createTables();
  await createForeignTables();
  await insertForeignKeys();
  await insertIntoTables();
});

after(async () => {
  await dropForeignKeyTables();
  await dropTables();
});
