const axios = require('axios');

const apiBe = axios.create({
  baseURL: ` ${process.env.REACT_APP_BACKEND_URL}`,
  timeout: 60_000,
  withCredentials: true,
});

apiBe.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);

module.exports = { apiBe };
