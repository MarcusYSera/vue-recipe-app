import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Model from './../models/model.js';
import { jwtAccessTokenSecret } from './../settings.js';
import { sendErrorResponse } from './../helpers/response.js';
import { isEmpty } from './../helpers/validation.js';

const usersModel = new Model('users');

const getUserByEmail = (columns, clause) => {
  return usersModel.select(columns, clause);
};

// String.prototype.isEmpty = function () {
//   return this.length === 0 || !this.trim();
// };

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtAccessTokenSecret, async (err, user) => {
    if (err) return res.sendStatus(403);
    let columns = `*`;
    let clause = `WHERE user_id = ${user.user_id}`;
    req.user = await getUserByEmail(columns, clause);
    console.log(req.user.rows);
    next();
  });
};

export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password))
    return sendErrorResponse({
      res,
      message: 'Email or Password Field is missing',
      statusCode: 400,
    });
  let columns = 'user_id, email, password';
  let clause = `WHERE email = '${email}'`;
  const user = await getUserByEmail(columns, clause);
  if (user.rows.length == 0)
    return res.status(401).json({ error: true, message: 'account does not exist' });
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch)
    return res.status(401).json({ error: true, message: 'password does not match' });
  req.body.user_id = user.rows[0].user_id;
  next();
};

// export const errorHandler = async (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// };
