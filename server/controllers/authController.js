const { getCookieOption } = require('../utils');

const { TEXT } = require('../constants');
const { createAccessToken, verifyRefreshToken, createRefreshToken } = require('../utils/jwtUtils');

exports.refreshAccessToken = (cookie, res) => {
  try {
    const refreshToken = cookie?.[TEXT.TOKEN.REFRESH_TOKEN];

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const payload = verifyRefreshToken(refreshToken);

    // 새 토큰 발급
    const newAccessToken = createAccessToken({ id: payload.userId });
    const newRefreshToken = createRefreshToken({ id: payload.userId });

    // 쿠키 설정 후 응답
    const tokenMaxAge = {
      accessToken: TEXT.COOKIE_MAX_AGE.ACCESS_TOKEN,
      refreshToken: TEXT.COOKIE_MAX_AGE.REFRESH_TOKEN,
    };
    const cookieOption = getCookieOption(tokenMaxAge);

    res.cookie(TEXT.TOKEN.ACCESS_TOKEN, newAccessToken, cookieOption.accessToken);
    res.cookie(TEXT.TOKEN.REFRESH_TOKEN, newRefreshToken, cookieOption.refreshToken);

    return res.status(200).json({ message: 'token refresh success!' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};
