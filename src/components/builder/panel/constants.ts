export const ACTION_OPTIONS = {
  NAVIGATE_PAGE: '내 사이트 다른 화면으로 이동',
  OPEN_URL: '외부 링크 열기 (웹사이트, 카카오 오픈채팅 등)',
  SCROLL_TO_BLOCK: '특정 화면 영역으로 스크롤 이동',
  CALL_PHONE: '전화 걸기',
  COPY_TO_CLIPBOARD: '텍스트 복사하기',
  DOWNLOAD_FILE: '파일 / 소개서 다운로드',
  SHOW_MODAL: '팝업(모달) 띄우기',
  SHARE_PAGE: '이 페이지 공유하기',
};

export const MODAL_ICON_OPTIONS = [
  { id: 'none', label: '없음', emoji: '✕' },
  { id: 'info', label: '안내', emoji: 'ℹ️' },
  { id: 'bell', label: '공지', emoji: '🔔' },
  { id: 'check', label: '완료/성공', emoji: '✅' },
  { id: 'sparkles', label: '이벤트/혜택', emoji: '✨' },
  { id: 'gift', label: '쿠폰/선물', emoji: '🎁' },
  { id: 'alert', label: '주의/규칙', emoji: '⚠️' },
  { id: 'help', label: '도움말/FAQ', emoji: '❓' },
] as const;

export const CUSTOM_EFFECT_OPTIONS = {
  TOGGLE_VISIBILITY: '숨기기 / 보여주기 토글',
  COLOR_PRIMARY: '브랜드 색상으로 칠하기',
  COLOR_DANGER: '붉은색으로 칠하기',
  FADE_IN: '서서히 나타나기',
  SHAKE: '흔들림',
};

export const THEME_PRESETS = [
  { id: 'modern-dark', name: 'Modern Dark', bg: '#0f172a', text: '#f8fafc', primary: '#38bdf8' },
  { id: 'ocean-sky', name: 'Ocean Sky', bg: '#f0f9ff', text: '#0c4a6e', primary: '#0284c7' },
  { id: 'warm-wood', name: 'Warm Wood', bg: '#fffbeb', text: '#78350f', primary: '#d97706' },
  { id: 'soft-pastel', name: 'Soft Pastel', bg: '#fdf4ff', text: '#701a75', primary: '#c026d3' },
  { id: 'clean-white', name: 'Clean White', bg: '#ffffff', text: '#0f172a', primary: '#2563eb' },
  { id: 'vivid-brand', name: 'Vivid Brand', bg: '#eff6ff', text: '#1e3a8a', primary: '#4f46e5' },
];

export const BOARD_VIEW_OPTIONS = {
  table: '테이블형',
  gallery: '갤러리형',
  list: '리스트형',
};

export const CHART_TYPE_OPTIONS = {
  bar: '막대 차트',
  dot: '점 차트',
  line: '라인 차트',
};

// Panel Labels Dictionary to avoid hardcoded strings
export const PANEL_LABELS = {
  TAB_CONTENT: '📝 콘텐츠',
  TAB_STYLE: '🎨 스타일',
  TAB_ACTION: '⚡ 동작',
  SECTION_CONTENT: '기본 콘텐츠',
  SECTION_MEDIA: '미디어 & 배경 이미지',
  SECTION_STYLE: '스타일 및 테마',
  SECTION_ACTION: '버튼 설정 및 동작',
  BUTTON_TEXT: '버튼 문구',
  ACTION_TYPE: '동작 선택',
  TITLE: '타이틀',
  SUBTITLE: '서브카피',
  BACKGROUND_COLOR: '배경 색상',
  TEXT_COLOR: '텍스트 색상',
};
