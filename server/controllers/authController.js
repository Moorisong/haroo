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
