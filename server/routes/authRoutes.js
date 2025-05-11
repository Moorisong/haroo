const express = require('express');

const { getKakaoLoginToken } = require('../controllers/authController');

const router = express.Router();
router.post('/', getKakaoLoginToken);

module.exports = router;
