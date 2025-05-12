const { createAccessToken, verifyRefreshToken } = require('../utils/jwtUtils');

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = createAccessToken({ id: payload.userId });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: '리프레시 토큰 검증 실패 --- Invalid refresh token' });
  }
};
