const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '2h';
const JWT_REFRESH_EXPIRATION_TIME = process.env.JWT_REFRESH_EXPIRATION_TIME || '24h';

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

const createAccessToken = (user) => jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
const createRefreshToken = (user) =>
  jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME });

const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, JWT_SECRET);
  } catch (err) {
    throw new Error(`Invalid refresh token : ${err.message}`);
  }
};

const verifyAccessToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, JWT_SECRET);
  } catch (err) {
    throw new Error(`Invalid access token : ${err.message}`);
  }
};

const getUserTokens = (user) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return { accessToken, refreshToken };
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    throw new Error(`Failed to decode token: ${err.message}`);
  }
};

module.exports = {
  verifyRefreshToken,
  getUserTokens,
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  decodeToken
};
