import { api_get } from 'src/services/axios';
import { METHOD_TYPE } from 'src/const';

export const fetchData = async (url, method) => {
  let data;
  switch (method) {
    case METHOD_TYPE.GET:
      data = await api_get(url);
      break;
    default:
      return;
  }
  return data;
};
