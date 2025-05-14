import axios from 'axios';
import Cookies from 'js-cookie';
import { HEADERS, TOKEN } from 'src/constants';

export const apiBe = axios.create({
  baseURL: `${process.env.REACT_APP_FRONTEND_PROD_URL}`,
  timeout: 60_000,
  withCredentials: true,
});

apiBe.interceptors.request.use(
  (config) => {
    // 쿠키에서 access token을 가져오기
    const accessToken = Cookies.get(TOKEN.ACCESS_TOKEN);

    // access token이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      config.headers[HEADERS.AUTHORIZATION] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);
