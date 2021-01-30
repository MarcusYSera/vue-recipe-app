import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index.js';

const app = express();

// swap these values
const corsOptions = {
  // origin: 'http://localhost:8080',
  origin: 'https://project-melon-bread.com',
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
