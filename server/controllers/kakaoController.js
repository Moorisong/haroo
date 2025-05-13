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
  } catch (err) {
    return res.status(500).json({ message: '카카오 로그인 인증 단계에서 에러가 발생했습니다.', err });
  }
};

module.exports = { getKakaoLoginToken };
