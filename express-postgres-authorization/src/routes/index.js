import express from 'express';
import {
  createUser,
  login,
  usersPage,
  logoutUser,
  refreshJWTAuthToken,
  findUserByEmail,
} from './../controllers/index.js';
import {
  authenticateToken,
  authenticateUser,
  authenticateCreateUser,
} from './../middleware/index.js';

const authorizationRouter = express.Router();
// Sign Up Flow One
authorizationRouter.get('/users/findBy/:email', findUserByEmail);

authorizationRouter.post('/users/signup', authenticateCreateUser, createUser);
authorizationRouter.post('/users/auth/login', authenticateUser, login);

authorizationRouter.post('/users/auth/refresh', refreshJWTAuthToken); //  silent refresh, create new access token, if expired, using refresh token
authorizationRouter.delete('/users/auth/logout', authenticateToken, logoutUser); //  remove refresh token

// need a way to blacklist refresh tokens if the user updates password

// Authorization Test Route
authorizationRouter.get('/users', authenticateToken, usersPage);

export default authorizationRouter;
