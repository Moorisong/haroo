export const TITLE_TEXT = {
  KOREAN: '[하루] 오늘의 확률 시뮬레이터',
  ENGLISH: "Today's Luck Simulator",
};

export const SCALE = {
  WEB_WIDTH: 'w-[18rem]',
};

export const COLOR = {
  SKY_BLUE: 'text-[#008EED]',
};

export const FONT = {
  BIG_BLACK: 'text-2xl font-bold',
  MEDIUM_BLUE: `font-medium ${COLOR.SKYBLUE}`,
  SMALL_GRAY: 'text-xs text-gray-300',
  SMALL_DARTGRAY: 'text-xs text-gray-400',
  HOVER_UNDERLINE: 'underline-offset-2 hover:underline',
  HOVER_UNDERLINE_TO_GRAY: 'hover:text-gray-700 underline-offset-2 hover:underline',
};

export const DATA_TYPE = {
  CONDITION: '무슨 확률이 궁금한가요?',
  CONDITION_ADDITIONAL: '예시 : 오늘 고백하면 성공할 확률',
  YOUTUBE: '응원 영상이 있나요?',
  YOUTUBE_ADDITIONAL: ' 유튜브 링크를 넣으면 함께 전송돼요!',
  WITHOUT_YOUTUBE: '유튜브 영상 없이 공유할래요.',
  WITH_YOUTUBE: '유튜브 영상을 함께 보낼게요.',
  TEXT: {
    BUTTON_SHARE: '공유하기',
    BUTTON_LOGOUT: '로그아웃',
    MAX_LENGTH: '35',
  },
};

export const ALERT_CONTENT = {
  EMPTY_TEXT: '구하고싶은 확률을 입력해주세요.',
  INVALID_URL: '유튜브 동영상 주소를 정확하게 입력해주세요.',
  LOGIN_ERROR: '로그인 중 오류가 발생했습니다.',
};

export const KAKAO_FEED_TEXT = {
  DESCRIPTION_WITH_YOUTUBE: '%의 확률로 이루어집니다.\n응원이 담긴 영상을 확인하세요 :)',
  DESCRIPTION_WITHOUT_YOUTUBE: '%의 확률로 이루어집니다.\n결과가 마음에 드시나요? :)',

  PROFILE_TEXT: '오늘의 확률 시뮬레이터 ✨',
  BUTTON_TITLE_TEXT: '운세 직접 뽑아주기 👉',
};

export const TOKEN_NAME = 'harooToken';

export const PATH = {
  LOGO_SVG: '/logo.svg',
  LOGO_KAKAO_SHARE: '/logo_kakao_share.jpg', // 카카오 공유하기 템플릿용 이미지
  DOMAIN: 'https://haroo.vercel.app',
};

export const YOUTUBE_IMAGE_URL = (id) => `https://img.youtube.com/vi/${id}/0.jpg`;
