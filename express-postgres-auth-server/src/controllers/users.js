import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

let refreshTokens = [];

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5m' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
};

export const createAuthorizationToken = async (req, res) => {
  const email = req.body.email;
  const user = { email: email };

  const jwtAccessToken = generateJWTAccessToken(user);
  const jwtRefreshToken = generateJWTRefreshToken(user);
  refreshTokens.push(jwtRefreshToken);
  res.json({ jwtAccessToken: jwtAccessToken, jwtRefreshToken: jwtRefreshToken });
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
  const jwtRefreshToken = req.body.jwtRefreshToken;
  if (jwtRefreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(jwtRefreshToken)) return res.sendStatus(403);
  jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const jwtAccessToken = generateJWTAccessToken({ email: user.email });
    res.json({ jwtAccessToken: jwtAccessToken });
  });
};

export const logoutUser = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.jwtRefreshToken);
  res.sendStatus(204);
};
