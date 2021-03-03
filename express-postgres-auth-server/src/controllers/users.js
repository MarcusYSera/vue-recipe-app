import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

let refreshTokens = [];

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const user = { email: email };

  const jwtAccessToken = generateAccessToken(user);
  const jwtRefreshToken = jwt.sign(user, jwtRefreshTokenSecret);
  refreshTokens.push(jwtRefreshToken);
  res.json({ jwtAccessToken: jwtAccessToken, jwtRefreshToken: jwtRefreshToken });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '15s' });
};

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({ users: data.rows.filter((user) => user.email === req.user.email) });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

export const getJWTRefreshToken = async (req, res) => {
  const refreshToken = req.body.jwtRefreshToken;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
};

export const logoutUser = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.jwtRefreshToken);
  res.sendStatus(204);
};
