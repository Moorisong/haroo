const express = require('express');

const { getKakaoLoginToken } = require('../controllers/kakaoController');

const router = express.Router();
router.post('/', getKakaoLoginToken);

module.exports = router;
