const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION_TIME, JWT_REFRESH_EXPIRATION_TIME } = process.env;

exports.createAccessToken = (user) =>
   jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME }) // 15분
;

exports.createRefreshToken = (user) =>
   jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION_TIME }) // 7일
;

exports.verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    // Refresh Token 검증
    const user = verifyRefreshToken(refreshToken);

    // 새로운 Access Token 발급
    const accessToken = createAccessToken(user);
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
