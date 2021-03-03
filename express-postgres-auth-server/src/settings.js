import dotenv from 'dotenv';

dotenv.config();

// export const port = process.env.PORT;

export const corsOrigin = process.env.CORS_ORIGIN;

export const jwtAccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const jwtRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
