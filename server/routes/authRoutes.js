const express = require('express');

const { getKakaoLoginToken, getNewJwtTokens } = require('../controllers/kakaoController');

const router = express.Router();
router.post('/kakao', getKakaoLoginToken);
router.post('/refresh', getNewJwtTokens);

module.exports = router;
