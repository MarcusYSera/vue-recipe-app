import express from 'express';
import { loginUser, usersPage } from './../controllers/index.js';
import { authenticateToken } from './../middleware/index.js';

const indexRouter = express.Router();

indexRouter.post('/users/login', loginUser);
indexRouter.get('/users', authenticateToken, usersPage);

export default indexRouter;
