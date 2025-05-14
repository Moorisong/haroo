const express = require('express');

const { dailyHaroo } = require('../controllers/dailyHarooController');
const verifyTokenMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.get('/', verifyTokenMiddleware, dailyHaroo);

module.exports = router;
