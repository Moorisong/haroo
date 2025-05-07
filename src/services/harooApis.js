import { apiBe } from 'src/services';
import { DATA_TYPE } from 'src/constants';

export async function getHarooData(body) {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const response = await apiBe.post(`${process.env.REACT_APP_NODE_URL}/api/chat`, body, { headers });
    return response.data;
  } catch (error) {
    alert(DATA_TYPE.API_ERROR_MESSAGE, error);
    throw error;
  }
}
