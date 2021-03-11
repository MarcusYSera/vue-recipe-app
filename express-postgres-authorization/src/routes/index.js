import express from 'express';
import {
  // createUser,
  loginReturnAuthorizationToken,
  // createAuthorizationToken,
  usersPage,
  getJWTRefreshAuthToken,
  logoutUser,
} from './../controllers/index.js';
import { authenticateToken, checkForCookie } from './../middleware/index.js';

const authorizationRouter = express.Router();

authorizationRouter.get('/users', checkForCookie, authenticateToken, usersPage);

// authorizationRouter.post('users/signup', createUser);
authorizationRouter.post('/users/login', loginReturnAuthorizationToken);

// authorizationRouter.post('/users/authorization', createAuthorizationToken); //  login, create access token and refresh token
authorizationRouter.post('/users/login/refreshauthtoken', getJWTRefreshAuthToken); //  silent refresh, create new access token, if expired, using refresh token
authorizationRouter.delete('/users/logout', logoutUser); //  invalidate access token

export default authorizationRouter;
