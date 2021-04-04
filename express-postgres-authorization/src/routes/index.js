import express from 'express';
import {
  // createUser,
  login,
  usersPage,
  getJWTRefreshAuthToken,
  logoutUser,
  refreshJWTAuthToken,
} from './../controllers/index.js';
import { authenticateToken, authenticateUser } from './../middleware/index.js';

const authorizationRouter = express.Router();
// Sign Up Flow One
// authorizationRouter.post('users/signup', createUser);

// Login Flow One
authorizationRouter.post('/users/auth/login', authenticateUser, login);
// Login Flow Two
authorizationRouter.post('/users/auth/refresh', refreshJWTAuthToken); //  silent refresh, create new access token, if expired, using refresh token
authorizationRouter.delete('/users/auth/logout', logoutUser); //  invalidate access token

// Authorization Test Route
authorizationRouter.get('/users', authenticateToken, usersPage);

export default authorizationRouter;
