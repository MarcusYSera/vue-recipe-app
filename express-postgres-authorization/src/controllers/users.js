import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

//functions

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5m' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
};

const storeRefreshToken = (email, jwtRefreshToken) => {
  let jwtExpiresAt = jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, { ignoreExpiration: true });
  return usersModel.updateWithReturn(
    `JWT_REFRESH_TOKEN='${jwtRefreshToken}', JWT_EXPIRES_AT=${jwtExpiresAt.exp}`,
    `email = '${email}'`,
    'FIRST_NAME, EMAIL, JWT_REFRESH_TOKEN, JWT_EXPIRES_AT'
  );
};

export const loginReturnAuthorizationToken = async (req, res) => {
  const user_id = { user_id: req.body.user_id };
  const jwtAccessToken = generateJWTAccessToken(user_id);
  const jwtRefreshToken = generateJWTRefreshToken(user_id);
  await storeRefreshToken(user_id, jwtRefreshToken);
  // res.cookie('accessToken', jwtAccessToken, { httpOnly: true, secure: true });
  res.cookie('accessToken', jwtAccessToken, { httpOnly: true });
  res.status(200).json({
    user: req.body.user_id,
    jwtAccessToken: jwtAccessToken,
    jwtRefreshToken: jwtRefreshToken,
  });
};

// create jwt token here after login swapped with login route

// export const createAuthorizationToken = async (req, res) => {
//   const { id, email } = req.body;
//   const user = { id: id, email: email };

//   const jwtAccessToken = generateJWTAccessToken(user);
//   const jwtRefreshToken = generateJWTRefreshToken(user);
//   refreshTokens.push(jwtRefreshToken);
//   res.json({
//     jwtAccessToken: jwtAccessToken,
//     jwtRefreshToken: jwtRefreshToken,
//   });
// };

// get new access token using refresh token, silent refresh

export const getJWTRefreshAuthToken = async (req, res) => {
  if (!user.rows.length) return res.sendStatus(401);
  const jwtRefreshToken = user.rows[0].jwt_refresh_token;
  if (!jwtRefreshToken) return res.sendStatus(403);
  jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const jwtAccessToken = generateJWTAccessToken({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    res.cookie('accessToken', jwtAccessToken, { httpOnly: true, secure: true });
    res.json({ jwtAccessToken: jwtAccessToken });
  });
};

// test authorization route

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({
      users: data.rows.filter((user) => user.user_id === req.user.user_id),
    });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

// invalidate access token

export const logoutUser = async (req, res) => {
  res.clearCookie('accessToken');
  res.sendStatus(204);
};
