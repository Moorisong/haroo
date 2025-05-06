import axios from 'axios';

export const apiBe = axios.create({
  baseURL: `${process.env.REACT_APP_PROD_URL}`,
  timeout: 30_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    alert(error.message);
    window.location.href = `${process.env.REACT_APP_PROD_URL}/login`;
    throw error;
  },
);
