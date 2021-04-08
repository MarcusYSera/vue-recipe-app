import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authorizationRouter from './routes/index.js';
import { corsOrigin } from './settings.js';
// import { corsOriginLocal } from './settings.js';

const app = express();

app.use(
  cors({
    origin: `${corsOrigin}`,
    // origin: `${corsOriginLocal}`,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/v1', authorizationRouter);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

export default app;
