export const kakaoTextShare = (data) => {
  const sender = data[0].text;
  const content = data[1].text;

  window.Kakao.Share.sendDefault({
    objectType: 'text',
    text: content,
    link: { webUrl: process.env.REACT_APP_LOCAL_URL },
    buttonTitle: `${sender} 님이 보낸 메시지☺️`,
  });
};

// ksh -- 날씨 api 사용을 위한 함수

// import { api_get } from 'src/services/axios';
// import { METHOD_TYPE } from 'src/constants';

// export const fetchData = async (url, method) => {
//   let data;
//   switch (method) {
//     case METHOD_TYPE.GET:
//       data = await api_get(url);
//       break;
//     default:
//       return;
//   }
//   return data;
// };
