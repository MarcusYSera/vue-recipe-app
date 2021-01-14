import {
  dropTables,
  createTables,
  insertIntoTables,
  insertForeignKeys,
} from '../src/utils/queryFunctions';

before(async () => {
  await createTables();
  await insertForeignKeys();
  await insertIntoTables();
});

after(async () => {
  await dropTables();
});
