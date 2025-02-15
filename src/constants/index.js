export const METHOD_TYPE = {
  GET: 'get',
};

export const DATA_TYPE = {
  CONDITION: '전제',
  YOUTUBE: '유튜브 링크',
  TEXT: {
    BUTTON_SHARE: '공유하기',
    MAX_LENGTH: '35',
  },
};

export const ALERT_CONTENT = {
  TEXT_LIMIT: '메시지는 최대 35자까지 작성 가능합니다.',
  INVALID_URL: '유튜브 동영상 주소를 정확하게 입력해주세요.',
};

export const KAKAO_FEED_TEXT = {
  DESCRIPTION: '99%의 확률로 이루어집니다.\n응원이 담긴 영상을 확인하세요 :)',
  PROFILE_TEXT: '오늘의 확률 시뮬레이터 ✨',
  BUTTON_TITLE_TEXT: '운세 직접 뽑아주기 👉',
};

export const YOUTUBE_IMAGE_URL = (id) => `https://img.youtube.com/vi/${id}/0.jpg`;
