import pkg from 'pg';
// import { Pool } from 'pg';
import dotenv from 'dotenv';
import { connectionString } from '../settings.js';

const { Pool } = pkg;

dotenv.config();

export const pool = new Pool({ connectionString });
