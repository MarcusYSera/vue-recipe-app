import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const user = { email: email };

  const jwtAccessToken = jwt.sign(user, jwtAccessTokenSecret);
  res.json({ jwtAccessToken: jwtAccessToken });
};

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({ users: data.rows.filter((user) => user.email === req.user.email) });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};
