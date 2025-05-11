import axios from 'axios';

export const apiBe = axios.create({
  baseURL: `${process.env.REACT_APP_FRONTEND_PROD_URL}`,
  timeout: 60_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    throw error;
  },
);
