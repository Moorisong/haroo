const { apiBe } = require('../api');
const { TEXT, PAHT } = require('../constants');

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
  const response = await apiBe.post(PAHT.KAKAO.AUTH_TOKEN, data, { headers });
  return response.data.access_token;
};

exports.getUserId = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

   const response = await apiBe.get(PAHT.KAKAO.USER, { headers });
   return response.data.id;
};
