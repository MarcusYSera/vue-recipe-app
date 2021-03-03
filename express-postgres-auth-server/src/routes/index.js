import express from 'express';
import { loginUser, usersPage, getJWTRefreshToken, logoutUser } from './../controllers/index.js';
import { authenticateToken } from './../middleware/index.js';

const indexRouter = express.Router();

indexRouter.post('/users/login', loginUser);
indexRouter.post('/users/login/refreshtoken', getJWTRefreshToken);
indexRouter.get('/users', authenticateToken, usersPage);
indexRouter.delete('/users/logout', logoutUser);

export default indexRouter;
