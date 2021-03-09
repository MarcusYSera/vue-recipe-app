import Model from './../models/model.js';

const usersModel = new Model('users');

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

// let refreshTokens = [];

//functions

const generateJWTAccessToken = (user) => {
  return jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '5m' });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '7d' });
  // return jwt.sign(user, jwtRefreshTokenSecret, { expiresIn: '10sec' });
};

const getUserByEmail = (email, columns) => {
  let clause = `WHERE email = '${email}'`;
  return usersModel.select(columns, clause);
};

const storeRefreshToken = (email, jwtRefreshToken) => {
  let jwtExpiresAt = jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, { ignoreExpiration: true });
  return usersModel.updateWithReturn(
    `email = '${email}'`,
    'FIRST_NAME, EMAIL, JWT_REFRESH_TOKEN, JWT_EXPIRES_AT',
    `JWT_REFRESH_TOKEN='${jwtRefreshToken}', JWT_EXPIRES_AT=${jwtExpiresAt.exp}`
  );
};

export const loginReturnAuthorizationToken = async (req, res) => {
  const { email, password } = req.body;
  let columns = 'user_id, first_name, last_name, email, password';
  let user = await getUserByEmail(email, columns);
  if (user.rows.length == 0)
    return res.status(401).json({ error: true, message: 'account does not exist' });
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch)
    return res.status(401).json({ error: true, message: 'password does not match' });
  // swapping delete for setting the value to undefined is more efficient
  // ie: user.rows[0].password = undefined;
  delete user.rows[0].password;
  const jwtAccessToken = generateJWTAccessToken(user.rows[0]);
  const jwtRefreshToken = generateJWTRefreshToken(user.rows[0]);
  await storeRefreshToken(email, jwtRefreshToken);
  res
    .status(200)
    .json({ user: user.rows[0], jwtAccessToken: jwtAccessToken, jwtRefreshToken: jwtRefreshToken });
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
  let columns = 'user_id, first_name, last_name, email, jwt_refresh_token, jwt_expires_at';
  const user = await getUserByEmail(req.body.email, columns);
  if (!user.rows.length) return res.sendStatus(401);
  const jwtRefreshToken = user.rows[0].jwt_refresh_token;
  if (!jwtRefreshToken) return res.sendStatus(403);
  // console.log(user.rows[0]);
  jwt.verify(jwtRefreshToken, jwtRefreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const jwtAccessToken = generateJWTAccessToken({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    res.json({ jwtAccessToken: jwtAccessToken });
  });
};

// test authorization route

export const usersPage = async (req, res) => {
  try {
    const data = await usersModel.select('user_id, first_name, last_name, email, password');
    res.status(200).json({
      users: data.rows.filter((user) => user.email === req.user.email),
    });
  } catch (err) {
    res.status(200).json({ users: err.stack });
  }
};

// invalidate access token

export const logoutUser = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.jwtRefreshToken);
  res.sendStatus(204);
};
