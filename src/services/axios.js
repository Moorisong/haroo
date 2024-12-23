import axios from 'axios';

export const api_get = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
