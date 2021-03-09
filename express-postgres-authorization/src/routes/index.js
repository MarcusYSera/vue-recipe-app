import express from 'express';
import {
  // createUser,
  loginReturnAuthorizationToken,
  createAuthorizationToken,
  // usersPage,
  getJWTRefreshToken,
  logoutUser,
} from './../controllers/index.js';
import { authenticateToken, verifyPassword } from './../middleware/index.js';

const authorizationRouter = express.Router();

// authorizationRouter.get('/users', authenticateToken, usersPage);

// authorizationRouter.post('users/signup', createUser);
authorizationRouter.post('/users/login', loginReturnAuthorizationToken);

authorizationRouter.post('/users/authorization', createAuthorizationToken); //  login, create access token and refresh token
authorizationRouter.post('/users/login/refreshtoken', getJWTRefreshToken); //  silent refresh, create new access token, if expired, using refresh token
authorizationRouter.delete('/users/logout', logoutUser); //  invalidate access token

export default authorizationRouter;
