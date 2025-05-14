const { TEXT } = require('../constants');
const { createAccessToken, verifyRefreshToken, createRefreshToken } = require('../utils/jwtUtils');

exports.refreshAccessToken = (refreshToken) => {
  if (!refreshToken) {
    throw new Error('No refresh token provided. Please login again.');
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = createAccessToken({ id: payload.userId });

    const newRefreshToken = createRefreshToken({ id: payload.userId });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw new Error(`invalid refresh token, login again please :  ${err.message}`);
  }
};

exports.extractAccessToken = (req) => {
  const authHeader = req.headers[TEXT.AUTHORIZATION];
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('Token missing from Authorization header');
  }

  return token;
};
