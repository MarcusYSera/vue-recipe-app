import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;

export const corsOrigin = process.env.CORS_ORIGIN;

export const jwtAccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
