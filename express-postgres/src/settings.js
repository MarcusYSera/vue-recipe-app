import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;

export const connectionString = process.env.CONNECTION_STRING;

export const corsOrigin = process.env.CORS_ORIGIN;
