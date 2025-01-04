import { api_get } from 'src/services/axios';
import { METHOD_TYPE } from 'src/constants';

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

export const kakaoTextShare = (data) => {
  window.Kakao.Share.sendDefault({
    objectType: 'text',
    text: data.text,
    link: { webUrl: process.env.REACT_APP_LOCAL_URL },
    buttonTitle: `${data.user} 님이 보낸 메시지☺️`,
  });
};
