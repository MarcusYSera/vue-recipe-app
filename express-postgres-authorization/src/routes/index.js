import express from 'express';
import {
  // createUser,
  login,
  usersPage,
  logoutUser,
  refreshJWTAuthToken,
} from './../controllers/index.js';
import { authenticateToken, authenticateUser } from './../middleware/index.js';

const authorizationRouter = express.Router();
// Sign Up Flow One
// authorizationRouter.post('users/signup', createUser);

authorizationRouter.post('/users/auth/login', authenticateUser, login);
authorizationRouter.post('/users/auth/refresh', refreshJWTAuthToken); //  silent refresh, create new access token, if expired, using refresh token
authorizationRouter.delete('/users/auth/logout', authenticateToken, logoutUser); //  remove refresh token

// need a way to blacklist refresh tokens if the user updates password

// Authorization Test Route
authorizationRouter.get('/users', authenticateToken, usersPage);

export default authorizationRouter;
