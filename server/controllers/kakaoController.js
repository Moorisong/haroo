const { findUserAndUpdate } = require('../repository/user.repository');
const { getKaKaoAccessToken, getUserIdAndNickname } = require('../services/kakaoService');
const { getUserTokens } = require('../utils/jwtUtils');

const getKakaoLoginToken = async (req, res) => {
  try {
    // 카카오 엑세스 토큰 발급
    const accessTokenFromKakao = await getKaKaoAccessToken(req.body.code);
    const user = await getUserIdAndNickname(accessTokenFromKakao);

    // 유저 정보 DB 업데이트
    await findUserAndUpdate(user);

    const { accessToken, refreshToken } = getUserTokens(user);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message || '서버 에러: 카카오 로그인 인증' });
  }
};

module.exports = { getKakaoLoginToken };
