import pkg from 'pg';
// import { Pool } from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

// elephantsql testing database for travis ci
import {connectionString} from '../settings.js';
export const pool = new Pool({connectionString});
