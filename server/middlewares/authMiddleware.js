const jwt = require('jsonwebtoken');

const { TEXT } = require('../constants');
const { JWT_SECRET } = process.env;

const verifyTokenFromApp = (req, res, next) => {
  const token = req.headers[TEXT.AUTHORIZATION];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyTokenFromApp };
