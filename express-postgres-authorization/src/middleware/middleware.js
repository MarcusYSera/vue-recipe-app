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
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: true, message: 'Not Signed In' });
  token = token.split(' ')[1];
  // const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, jwtAccessTokenSecret, async (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        return res.status(403).json({ error: true, message: 'Token Expired' });
      return res.status(403).json({ error: true, message: 'Invalid Token Authorization' });
    }
    let columns = `*`;
    let clause = `WHERE user_id = ${user.user_id}`;
    req.user = await getUserByEmail(columns, clause);
    // console.log(req.user.rows);
    next();
  });
};

export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password))
    return sendErrorResponse({ res, message: 'Email or Password is missing', statusCode: 401 });
  if (!isValidEmail(email) || !validatePassword(password))
    return sendErrorResponse({ res, message: 'Invalid Email or Password', statusCode: 401 });
  let columns = 'user_id, email, password';
  let clause = `WHERE email = '${email}'`;
  const user = await getUserByEmail(columns, clause);
  if (user.rows.length == 0)
    return res.status(401).json({ error: true, message: 'account does not exist' });
  // const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!comparePassword(user.rows[0].password, password))
    return sendErrorResponse({ res, message: 'Incorrect Password', statusCode: 401 });
  req.body.user_id = user.rows[0].user_id;
  next();
};
