import { apiBe } from 'src/services';
import { DATA_TYPE } from 'src/constants';

export async function fetchHarooResponseFromGpt(body) {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const response = await apiBe.post(`${process.env.REACT_APP_NODE_URL}/api/chat`, body, { headers });
    return response.data;
  } catch (error) {
    alert(DATA_TYPE.API_ERROR_MESSAGE, error);
    throw new Error('error in fetch haroo response from gpt');
  }
}

export async function getHarooData() {
  try {
    const response = await apiBe.get(`${process.env.REACT_APP_NODE_URL}/api/haroo/today`);
    return response.data;
  } catch (error) {
    alert(DATA_TYPE.API_ERROR_MESSAGE, error);
    throw new Error('error in get haroo data');
  }
}
