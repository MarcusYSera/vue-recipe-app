import { Pool } from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings';

dotenv.config();

// export const pool = new Pool({ connectionString });

export const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'vue_recipe_app',
  password: 'password',
  port: 5432,
});
