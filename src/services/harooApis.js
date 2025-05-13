import { apiBe } from 'src/services';
import { API_HEADER } from 'src/constants';

export async function fetchHarooResponseFromGpt(body) {
  const headers = API_HEADER.JSON;
  try {
    const response = await apiBe.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, body, { headers });
    return response.data;
  } catch (err) {
    throw new Error(`error in fetch haroo response from gpt ${err.message}`);
  }
}

export async function getHarooData() {
  try {
    const response = await apiBe.get(`${process.env.REACT_APP_BACKEND_URL}/api/haroo/today`);
    return response.data;
  } catch (err) {
    throw new Error(`error in get haroo data ${err.message}`);
  }
}

export async function sendKakaoTokenToBackend(code) {
  const headers = API_HEADER.JSON;
  const body = { code };

  try {
    const response = await apiBe.post(`${process.env.REACT_APP_BACKEND_URL}/auth/kakao`, body, { headers });
    return response.data;
  } catch (err) {
    throw new Error(`error in send kakao token to the backend : ${err.message}`);
  }
}

export async function refreshAccessToken(refreshToken) {
  const headers = API_HEADER.JSON;
  const body = refreshToken;
  try {
    const response = await apiBe.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, body, { headers });
    return response.data;
  } catch (err) {
    throw new Error(`error in refresh jwt access token : ${err.message}`);
  }
}
