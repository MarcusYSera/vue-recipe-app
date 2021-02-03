import pkg from 'pg';
// import { Pool } from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

// elephantsql database
// import { connectionString } from '../settings';
// export const pool = new Pool({ connectionString });

// local instance with user me
// export const pool = new Pool({
//   user: 'me',
//   host: 'localhost',
//   database: 'vue_recipe_app',
//   password: 'password',
//   port: 5432,
// });

// travis ci test
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  port: 5432,
});
