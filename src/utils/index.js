export const kakaoListShare = (data, youtubeId) => {
  const condition = data[0].text;
  const youtubeUrl = data[1].text;
  const youtubeImageUrl = getYoutubeImageUrl(youtubeId);

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${condition} 확률`,
      imageUrl: youtubeImageUrl,
      link: {
        webUrl: youtubeUrl,
        mobileWebUrl: youtubeUrl,
      },
      description: '99%의 확률로 이루어집니다. 응원이 담긴 영상을 확인하세요 :) ',
    },
    itemContent: {
      profileText: '오늘의 확률 운세 🌟',
    },
    buttonTitle: '상대방 운세 뽑아주기',
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
