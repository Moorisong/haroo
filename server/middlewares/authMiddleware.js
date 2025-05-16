const { TEXT } = require('../constants');
const { verifyAccessToken } = require('../utils/jwtUtils');

const verifyTokenMiddleware = (req, res, next) => {
  try {
    const accessToken = req.cookies?.[TEXT.TOKEN.ACCESS_TOKEN];

    verifyAccessToken(accessToken);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = { verifyTokenMiddleware };
