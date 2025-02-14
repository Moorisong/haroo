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

export function getYoutubeId(url) {
  // 유튜브 URL 형식에 맞는 정규식 패턴 (youtu.be, youtube.com/watch, embed, v, shorts 지원)
  const pattern = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^#&?]{11})/;
  const match = url.match(pattern);
  const youtubeID = match === null ? false : match['1'];
  return youtubeID;
}

export function getYoutubeImageUrl(id) {
  const youtubeImageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
  if (id) return youtubeImageUrl;
  return null;
}

export function validateYoutubeUrl(id) {
  if (id) return true;
  return false;
}

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
