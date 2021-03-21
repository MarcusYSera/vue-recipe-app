import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Model from './../models/model.js';
import { jwtAccessTokenSecret } from './../settings.js';
const usersModel = new Model('users');

const getUserByEmail = (columns, clause) => {
  return usersModel.select(columns, clause);
};

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
