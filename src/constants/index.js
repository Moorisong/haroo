export const TEXT = {
  LUCK_SIMULATOR: {
    TITLE: '[하루] 오늘의 확률 시뮬레이터',
    SUBTITLE: "Today's Luck Simulator",
  },
  HAROO: {
    TITLE: '[하루] 오늘의 선택, 하루가 쑥쑥 자라요 ☺️',
    SUBTITLE:
      '매일 투표로 하루의 선택을 이끌어가고, 그에 따라 하루의 이야기도 변화합니다.\n당신의 선택이 하루의 성장과 스토리를 만들어가요!',
    VOTE_TOKEN: 'haroo voted',
    VOTE_TITLE: '💬 오늘 하루의 선택! 투표하고 하루를 성장시켜요',
    VOTE_RULES: [
      '- 투표는 매일 23시 30분에 종료돼요. 놓치지 마세요!',
      '- 여러분의 선택이 하루의 성격과 행동을 바꿔요. 1년 후, 하루는 어떤 모습일까요?',
      '- 1등이 여러개면 하루가 랜덤으로 하나를 선택해요. 결과는 다음 날 확인하세요!',
    ],
    STAT_TITLE: '🎹 하루의 스탯',
    VOTE_RESULT: {
      HEADER_TEXT_0: '🗓️ ',
      HEADER_TEXT_1: '지난 투표에서 ',
      HEADER_TEXT_2: '가 가장 많이 선택됐어요!',
      BODY_TEXT_1: '하루의',
      BODY_TEXT_2: '스탯이 ',
      BODY_TEXT_STAT_UP: ' 증가했어요',
      BODY_TEXT_STAT_DOWN: ' 떨어졌어요',
    },
  },
  EXCEPTION: '오늘 하루는 서버 문제로 살짝 쉬어가요.\n푹 쉬고 내일 다시 만나요! 🌼',
};

export const SCALE = {
  WEB_WIDTH: 'w-[18rem]',
  WIDTH_20: 'w-[20rem]',
};

export const COLOR = {
  SKY_BLUE: 'text-[#008EED]',
  PROGRESSBAR_RED: 'bg-red-600',
  PROGRESSBAR_BLUE: 'bg-blue-600',
};

export const FONT = {
  BIG_BLACK: 'text-2xl font-bold',
  MEDIUM_BLUE: `font-medium ${COLOR.SKY_BLUE}`,
  SMALL_BLUE: `text-xs font-medium ${COLOR.SKY_BLUE}`,
  SMALL_GRAY: 'text-xs text-gray-300',
  SMALL_DARTGRAY: 'text-xs text-gray-400',
  HOVER_UNDERLINE: 'underline-offset-2 hover:underline',
  HOVER_UNDERLINE_TO_GRAY: 'hover:text-gray-700 underline-offset-2 hover:underline',
};

export const STYLE = {
  LOGIN_BUTTON: 'cursor-pointer flex-1 w-[5rem] h-[2.5rem] font-bold rounded-sm',
  BORDER_ROUND: 'rounded-sm border',
  BORDER_GRAY: 'border-gray-300',
  LEFT_BORDER_INDEX_BLUE: 'border-l-7 border-[#4363b4]',
  BG_LIGHT_GRAY: 'bg-[#f9fafb]',
  FLEX_COL_ITEM_CENTER: 'flex flex-col items-center',
};

export const COMPONENT_STYLE = {
  HAROO_INTRO: {
    CONTAINER: `${STYLE.FLEX_COL_ITEM_CENTER} ${STYLE.BORDER_ROUND} ${STYLE.BG_LIGHT_GRAY} ${STYLE.BORDER_GRAY} w-full md:w-2/3 px-6 py-5 p-6 text-gray-700 justify-center space-y-2`,
    EMOTICON: 'w-full text-center',
    TEXT: 'w-full text-center text-sm leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-wrap',
  },
  STAT: {
    CONTAINER: `grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-6`,
    BOX: `flex flex-col items-center justify-center bg-white p-4 border rounded-md shadow-sm`,
    TITLE: `text-sm font-semibold text-gray-600`,
    VALUE: `text-lg font-bold text-blue-500`,
    CARD: `${STYLE.BORDER_ROUND} ${STYLE.BORDER_GRAY} w-full bg-white p-6 w-full md:w-1/3 flex flex-col justify-between`,
    HEADER: 'text-xl font-bold mb-4 text-gray-800 text-center',
    SCROLL_AREA: 'space-y-4 max-h-35 overflow-y-auto pr-1 flex-1',
    LABEL_ROW: 'flex justify-between items-center text-xs',
    LABEL_TEXT: 'font-medium text-gray-600',
    VALUE_TEXT: 'font-mono text-gray-800',
    BAR_BACKGROUND: 'w-full bg-gray-200 h-2 rounded-full overflow-hidden opacity-60',
  },

  MAIN: {
    CONTAINER: 'max-w-3xl mx-auto px-4 py-8',
    WRAPPER: `${STYLE.FLEX_COL_ITEM_CENTER} gap-8`,
    BUTTON:
      'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-full shadow-md transition-all mb-8 cursor-pointer',
    FLEX_ROW: 'flex flex-col md:flex-row gap-8 w-full',
    LOGOUT_WRAPPER: 'flex justify-end mb-4',
  },

  VOTE: {
    WRAPPER: `w-full bg-blue-25 ${STYLE.BORDER_ROUND} border-blue-300 p-6 mt-2 space-y-6`,
    TITLE: `text-center text-sm font-semibold`,
    TOPIC: `text-xl font-bold text-blue-900 text-center mb-6`,
    OPTIONS_GRID: `grid grid-cols-2 sm:grid-cols-4 gap-4`,
    OPTION: `transition-colors px-4 py-2 rounded-md font-medium text-sm`,
    OPTION_DEFAULT: `bg-blue-50 hover:bg-blue-100`,
    OPTION_SELECTED: `bg-yellow-200`,
    RULES: `text-left text-xs text-gray-500 mt-4 space-y-1`,
    KNOWLEDGE_BOX: `${STYLE.LEFT_BORDER_INDEX_BLUE} w-full bg-blue-50 p-5 mt-6 text-sm text-gray-900 rounded-sm`,
  },
  VOTE_RESULT: {
    RESULT_BOX: 'p-7 bg-white rounded-2xl shadow-md border border-gray-200',
    RESULT_WRAPPER: 'relative w-full',
    HEADER: 'flex items-start gap-3 mb-3',
    HEADER_ICON: 'text-xl',
    HEADER_TEXT: 'text-gray-800 text-base font-semibold',
    BODY: 'flex items-start gap-3',
    BODY_ICON: 'text-xs',
    BODY_TEXT: 'text-gray-700 text-xs',
    VALUE_POSITIVE: 'text-blue-600',
    VALUE_NEGATIVE: 'text-red-600',
    TOPIC_BOX: 'flex items-center gap-x-1 mb-4',
    TOPIC_DATE: 'text-xs text-gray-500',
    TOPIC_TEXT: 'text-xs font-semibold text-gray-500',
  },
  EXCEPTION: {
    CONTAINER: 'w-full flex justify-center items-center',
    BOX: 'text-center bg-yellow-100 text-yellow-800 text-sm px-5 py-4 rounded-md border border-yellow-300 mb-7',
  },
};

export const DATA_TYPE = {
  LUCK_SIMULATOR: {
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
  },
  MAIN_PAGE: {
    LUCK_BUTTON_TEXT: ' 🎲 오늘의 행운지수 보러가기!',
  },
  ERROR_MESSAGE: '에러가 발생했습니다.',
  API_ERROR_MESSAGE: 'API 호출 오류: ',
};

export const ALERT_CONTENT = {
  EMPTY_TEXT: '구하고싶은 확률을 입력해주세요.',
  INVALID_URL: '유튜브 동영상 주소를 정확하게 입력해주세요.',
};

export const KAKAO_FEED_TEXT = {
  DESCRIPTION_WITH_YOUTUBE: '%의 확률로 이루어집니다.\n응원이 담긴 영상을 확인하세요 :)',
  DESCRIPTION_WITHOUT_YOUTUBE: '%의 확률로 이루어집니다.\n결과가 마음에 드시나요? :)',

  PROFILE_TEXT: '오늘의 확률 시뮬레이터 ✨',
  BUTTON_TITLE_TEXT: '운세 직접 뽑아주기 👉',
};

export const TOKEN = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const HEADERS = {
  AUTHORIZATION: 'authorization',
};

export const PATH = {
  LOGO_SVG: '/logo.svg',
  LOGO_KAKAO_SHARE: '/logo_kakao_share.jpg', // 카카오 공유하기 템플릿용 이미지
  DOMAIN: 'https://haroo.vercel.app',
  LUCK: '/luck',
  MAIN: '/main',
  DEFAULT: '/',
};

export const API_HEADER = {
  JSON: { 'Content-Type': 'application/json' },
};

export const ENV = {
  DEV: 'development',
  PROD: 'production',
};

export const YOUTUBE_IMAGE_URL = (id) => `https://img.youtube.com/vi/${id}/0.jpg`;
