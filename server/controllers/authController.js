const { apiBe } = require('../api');

const getKakaoLoginToken = async (req, res) => {
  try {
    const data = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}/auth`,
      code: req.body.code,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await apiBe.post(`https://kauth.kakao.com/oauth/token`, data, { headers });
    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message || '서버 에러: 카카오 로그인 인증' });
  }
};

module.exports = { getKakaoLoginToken };
