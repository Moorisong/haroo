import axios from 'axios';
import { PATH } from 'src/constants';
import { refreshAccessToken } from 'src/services/harooApis';

export const apiBe = axios.create({
  baseURL: `${process.env.REACT_APP_FRONTEND_PROD_URL}`,
  timeout: 60_000,
  withCredentials: true,
});

apiBe.interceptors.request.use(
  (config) => {
    config.withCredentials = true; // 쿠키 포함
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
        // 토큰들 재발급
        await refreshAccessToken();

        return apiBe(originalRequest); // 재요청
      } catch (err) {
        window.location.href = PATH.DEFAULT;
      }
    }

    return Promise.reject(error);
  },
);
