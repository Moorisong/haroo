import { KAKAO_FEED_TEXT, TOKEN_NAME, YOUTUBE_IMAGE_URL } from 'src/constants';
import { PATH } from 'src/constants';

export const kakaoListShare = (data, youtubeId, withoutYoutube) => {
  const condition = data[0].text;
  const youtubeUrl = data[1].text;
  const youtubeImageUrl = withoutYoutube ? PATH.DOMAIN + PATH.LOGO_KAKAO_SHARE : getYoutubeImageUrl(youtubeId);
  const percentValue = getRandomNumber();
  const DescriptionText = withoutYoutube
    ? `${percentValue}${KAKAO_FEED_TEXT.DESCRIPTION_WITHOUT_YOUTUBE}`
    : `${percentValue}${KAKAO_FEED_TEXT.DESCRIPTION_WITH_YOUTUBE}`;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `${condition}`,
      imageUrl: youtubeImageUrl,
      link: {
        webUrl: youtubeUrl,
        mobileWebUrl: youtubeUrl,
      },
      description: DescriptionText,
    },
    itemContent: {
      profileText: KAKAO_FEED_TEXT.PROFILE_TEXT,
    },
    buttons: [
      {
        title: KAKAO_FEED_TEXT.BUTTON_TITLE_TEXT,
        link: {
          webUrl: process.env.REACT_APP_FRONTEND_URL,
          mobileWebUrl: process.env.REACT_APP_FRONTEND_URL,
        },
      },
    ],
  });
};

export function getYoutubeId(url) {
  // 유튜브 URL 형식에 맞는 정규식 패턴 (youtu.be, youtube.com/watch, embed, v, shorts 지원)
  const pattern = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/))([^#&?]{11})/;
  const match = url.match(pattern);
  const youtubeID = match === null ? false : match['1'];
  return youtubeID;
}

export function getYoutubeImageUrl(id) {
  const youtubeImageUrl = YOUTUBE_IMAGE_URL(id);
  if (id) return youtubeImageUrl;
  return null;
}

export function validateYoutubeUrl(id) {
  if (id) return true;
  return false;
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export function kakaoLogin(url) {
  window.location.href = url;
}

export function kakaoLogout() {
  window.sessionStorage.removeItem(TOKEN_NAME);
}
