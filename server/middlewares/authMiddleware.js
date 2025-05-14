const { verifyAccessToken, extractAccessToken } = require('../utils/jwtUtils');

const verifyTokenMiddleware = (req, res, next) => {
  try {
    const accessToken = extractAccessToken(req);

    verifyAccessToken(accessToken);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = verifyTokenMiddleware;
