import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;

export const connectionString = process.env.CONNECTION_STRING;

export const corsOrigin = process.env.CORS_ORIGIN;

export const corsOriginLocal = process.env.CORS_ORIGIN_LOCAL;

export const jwtAccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
