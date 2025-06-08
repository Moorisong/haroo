const { apiBe } = require('../api');
const { TEXT, PATH } = require('../constants');
const { getUserTokens } = require('../utils/jwtUtils');

exports.getKaKaoAccessToken = async (code) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = {
    grant_type: `${TEXT.AUTHORIZATION}_code`,
    client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}/auth`,
    code: code,
  };
  const response = await apiBe.post(PATH.KAKAO.AUTH_TOKEN, data, { headers });
  return response.data.access_token;
};

exports.getUserIdAndNickname = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await apiBe.get(PATH.KAKAO.USER, { headers });
  return response.data;
};

exports.getUserTokensForLogin = (user) => getUserTokens(user);
