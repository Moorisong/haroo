const { getCookieOption } = require('../utils');

const { findUserAndUpdate } = require('../repository/user.repository');
const { getKaKaoAccessToken, getUserIdAndNickname } = require('../services/kakaoService');
const { getUserTokens } = require('../utils/jwtUtils');
const { TEXT } = require('../constants');
const { refreshAccessToken } = require('./authController');

const getKakaoLoginToken = async (req, res) => {
  try {
    const accessTokenFromKakao = await getKaKaoAccessToken(req.body.code);
    const user = await getUserIdAndNickname(accessTokenFromKakao);

    await findUserAndUpdate(user);

    const { accessToken, refreshToken } = getUserTokens(user);

    const tokenMaxAge = {
      accessTokenMaxAge: TEXT.COOKIE_MAX_AGE.ACCESS_TOKEN,
      refreshTokenMaxAge: TEXT.COOKIE_MAX_AGE.REFRESH_TOKEN,
    };

    const cookieOption = getCookieOption(tokenMaxAge);

    res.cookie(TEXT.TOKEN.ACCESS_TOKEN, accessToken, cookieOption.accessToken);
    res.cookie(TEXT.TOKEN.REFRESH_TOKEN, refreshToken, cookieOption.refreshToken);

    res.status(200).json({ message: 'login success!' });
  } catch (err) {
    return res.status(500).json({ message: '카카오 로그인 인증 단계에서 에러가 발생했습니다.', err: err.message });
  }
};

const getNewJwtTokens = (req, res) => {
  try {
    refreshAccessToken(req.cookies, res);
  } catch (err) {
    return res.status(500).json({ message: `error in get new tokens : ${err.message}` });
  }
};

module.exports = { getKakaoLoginToken, getNewJwtTokens };
