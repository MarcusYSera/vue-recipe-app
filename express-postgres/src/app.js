import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index.js';
import { corsOrigin } from './settings.js';

const app = express();

// swap these values
const corsOptions = {
  origin: `${corsOrigin}`,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const db = require('./models/model');

// db.sequelize.sync();

app.use('/v1', indexRouter);

export default app;
