export const TITLE_TEXT = {
  KOREAN: '[하루] 오늘의 확률 시뮬레이터',
  ENGLISH: "Today's Luck Simulator",
};

export const SCALE = {
  WEB_WIDTH: 'w-[18rem]',
};

export const FONT = {
  BIG_BLACK: 'text-2xl font-bold',
  MEDIUM_BLUE: 'font-medium text-[#008EED]',
  SMALL_GRAY: 'text-xs text-gray-300',
};

export const DATA_TYPE = {
  CONDITION: '어떤 확률을 구하고 싶나요?',
  YOUTUBE: '유튜브 영상 주소를 아래에 넣어주세요.',
  YOUTUBE_ADDITIONAL: '상대방에게 함께 전송됩니다.',
  WITHOUT_YOUTUBE: '유튜브 영상 없이 공유할래요.',
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
  LOGO: '/logo.svg',
};

export const YOUTUBE_IMAGE_URL = (id) => `https://img.youtube.com/vi/${id}/0.jpg`;
