import express from 'express';
import {
  createAuthorizationToken,
  usersPage,
  getJWTRefreshToken,
  logoutUser,
} from './../controllers/index.js';
import { authenticateToken } from './../middleware/index.js';

const authorizationRouter = express.Router();

authorizationRouter.get('/users', authenticateToken, usersPage);

authorizationRouter.post('/users/authorization', createAuthorizationToken);
authorizationRouter.post('/users/login/refreshtoken', getJWTRefreshToken);
authorizationRouter.delete('/users/logout', logoutUser);

export default authorizationRouter;
