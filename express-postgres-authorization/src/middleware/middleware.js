import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Model from './../models/model.js';
import { jwtAccessTokenSecret } from './../settings.js';
import { sendErrorResponse } from './../helpers/response.js';
import {
  isEmpty,
  isValidEmail,
  validatePassword,
  comparePassword,
} from './../helpers/validation.js';

const usersModel = new Model('users');

const getUserByEmail = (columns, clause) => {
  return usersModel.select(columns, clause);
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: true, message: 'Not Signed In' });
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, jwtAccessTokenSecret, async (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        return res.status(403).json({ error: true, message: 'Token Expired' });
      return res.status(403).json({ error: true, message: 'Invalid Token Authorization' });
    }
    req.user = user;
    next();
  });
};

export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password))
    return sendErrorResponse({ res, message: 'Email or Password is missing', statusCode: 401 });
  if (!isValidEmail(email) || !validatePassword(password))
    return sendErrorResponse({ res, message: 'Invalid Email or Password', statusCode: 401 });
  let columns = 'user_id, first_name, email, password';
  let clause = `WHERE email = '${email}'`;
  const user = await getUserByEmail(columns, clause);
  if (user.rows.length == 0)
    return res.status(401).json({ error: true, message: 'account does not exist' });
  let match = await comparePassword(user.rows[0].password, password);
  if (!match) return sendErrorResponse({ res, message: 'Incorrect Password', statusCode: 401 });
  req.body.user_id = user.rows[0].user_id;
  req.body.first_name = user.rows[0].first_name;
  next();
};

export const authenticateCreateUser = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  if (isEmpty(first_name) || isEmpty(last_name))
    return sendErrorResponse({ res, message: 'First or Last Name is missing', statusCode: 401 });
  if (isEmpty(email) || isEmpty(password))
    return sendErrorResponse({ res, message: 'Email or Password is missing', statusCode: 401 });
  if (!isValidEmail(email) || !validatePassword(password))
    return sendErrorResponse({ res, message: 'Invalid Email or Password', statusCode: 401 });
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);
  let columns = 'user_id, email';
  let clause = `WHERE email = '${email}'`;
  const user = await getUserByEmail(columns, clause);
  if (user.rows.length > 0)
    return res.status(401).json({ error: true, message: 'User already exists' });
  // return res.status(205).json({ message: 'successfully passed create user authentication' });
  next();
};
