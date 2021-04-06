import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from './routes/index.js';
import { corsOrigin, corsOriginLocal } from './settings.js';

const app = express();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', `${corsOrigin}`); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(
  cors({
    // origin: `${corsOriginLocal}`,
    origin: `${corsOrigin}`,
    methods: 'GET, POST, PUT',
    optionsSuccessStatus: 204,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const db = require('./models/model');

// db.sequelize.sync();

app.use('/v1', indexRouter);

export default app;
