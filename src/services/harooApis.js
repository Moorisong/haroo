import { apiBe } from 'src/services';
import { API_HEADER } from 'src/constants';
import axios from 'axios';

export async function getHarooData() {
  try {
    const response = await apiBe.get(`${process.env.REACT_APP_BACKEND_URL}/api/today`);
    return response.data;
  } catch (err) {
    throw new Error(`error in get haroo data ${err.message}`);
  }
}

export async function submitVote(voteId, optionIndex) {
  try {
    const headers = API_HEADER.JSON;
    const body = { voteId, optionIndex };

    const response = await apiBe.post(`${process.env.REACT_APP_BACKEND_URL}/vote/submit`, body, { headers });
    return response.data;
  } catch (err) {
    throw new Error(`error in submit vote : ${err.message}`);
  }
}

export async function sendKakaoCodeToBackend(code) {
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
  const body = { refreshToken };

  try {
    // apiBe 안 타고, 순수한 axios로 refresh 요청
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, body, {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(`error in refresh jwt access token : ${err.message}`);
  }
}
