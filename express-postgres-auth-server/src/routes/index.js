import express from 'express';
import {
  createAuthorizationToken,
  usersPage,
  getJWTRefreshToken,
  logoutUser,
} from './../controllers/index.js';
import { authenticateToken } from './../middleware/index.js';

const authorizationRouter = express.Router();

authorizationRouter.post('/users/authorization', createAuthorizationToken);
authorizationRouter.post('/users/login/refreshtoken', getJWTRefreshToken);
authorizationRouter.get('/users', authenticateToken, usersPage);
authorizationRouter.delete('/users/logout', logoutUser);

export default authorizationRouter;
