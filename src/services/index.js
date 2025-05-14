import axios from 'axios';
import Cookies from 'js-cookie';
import { HEADERS, PATH, TOKEN } from 'src/constants';
import { refreshAccessToken } from 'src/services/harooApis';

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
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 & 재시도 안했을 때만 진행
    // 401 에러가 났을 때 딱 1번만 refresh 후 재요청하고, 그 이후엔 무한반복 방지하는 안전장치
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(TOKEN.REFRESH_TOKEN);

        if (!refreshToken) {
          throw new Error('No refresh token found in cookie storage');
        }

        // access token 재발급
        const data = await refreshAccessToken({ refreshToken });

        // 새 token들 쿠키에 저장
        Cookies.set(TOKEN.ACCESS_TOKEN, data.accessToken, { path: '/', sameSite: 'None', secure: true });
        Cookies.set(TOKEN.REFRESH_TOKEN, data.refreshToken, { path: '/', sameSite: 'None', secure: true });

        // 헤더에 새 access token 설정 후 재요청
        originalRequest.headers[HEADERS.AUTHORIZATION] = `Bearer ${data.accessToken}`;

        return apiBe(originalRequest); // 재요청
      } catch (refreshError) {
        window.location.href = PATH.DEFAULT;
      }
    }

    return Promise.reject(error);
  },
);
