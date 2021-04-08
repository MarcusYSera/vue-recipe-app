import Model from './../models/model.js';
const usersModel = new Model('users');
import jwt from 'jsonwebtoken';
import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from './../settings.js';

const getStoredRefreshToken = async (user_id) => {
  let columns = `JWT_REFRESH_TOKEN`;
  let clause = `WHERE user_id = '${user_id}'`;
  return await usersModel.select(columns, clause);
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: true, message: 'Not Signed In' });
  jwt.verify(token, jwtAccessTokenSecret, async (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError')
        return res.status(403).json({ error: true, message: 'Token Expired' });
      return res.status(403).json({ error: true, message: 'Invalid Token Authorization' });
    }
    req.body.user = user;
    next();
  });
};

export const authenticateRefreshToken = async (req, res, next) => {
  if (!req.cookies.refreshToken)
    return res.status(403).json({ error: true, message: 'Not Logged In' });
  const refreshToken = req.cookies.refreshToken;
  jwt.verify(refreshToken, jwtRefreshTokenSecret, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: `${err.message}` });
    }
    req.body.user_id = user.user_id;
  });
  const user_id = req.body.user_id;
  const storedRefreshToken = await getStoredRefreshToken(user_id);
  const storedRefreshTkn = storedRefreshToken.rows[0].jwt_refresh_token;
  if (refreshToken !== storedRefreshTkn)
    return res.status(403).json({ error: true, message: 'Unauthorized Refresh Token, logout' });
  next();
};
