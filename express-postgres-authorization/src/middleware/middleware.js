import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Model from './../models/model.js';
import { jwtAccessTokenSecret } from './../settings.js';
const usersModel = new Model('users');

const getUserByEmail = (email, columns) => {
  let clause = `WHERE email = '${email}'`;
  return usersModel.select(columns, clause);
};

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtAccessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  let columns = 'user_id, email, password';
  const user = await getUserByEmail(email, columns);
  if (user.rows.length == 0)
    return res.status(401).json({ error: true, message: 'account does not exist' });
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch)
    return res.status(401).json({ error: true, message: 'password does not match' });
  req.body.user_id = user.rows[0].user_id;
  next();
};
