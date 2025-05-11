// const jwt = require('jsonwebtoken');

const { getKaKaoAccessToken, getUserId } = require('../services/kakaoService');
// const { JWT_SECRET } = process.env;

const getKakaoLoginToken = async (req, res) => {
  try {
    const accessToken = await getKaKaoAccessToken(req.body.code);
    const userId = await getUserId(accessToken);

    return res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({ error: error.message || '서버 에러: 카카오 로그인 인증' });
  }
};

module.exports = { getKakaoLoginToken };
