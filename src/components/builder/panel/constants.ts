export const ACTION_OPTIONS = {
  NAVIGATE_PAGE: '📄 내 사이트 다른 화면으로 이동',
  OPEN_URL: '🔗 외부 링크 열기 (새창)',
  SCROLL_TO_BLOCK: '⬇️ 특정 화면 영역으로 스크롤',
  CALL_PHONE: '📞 전화 걸기',
  OPEN_KAKAO: '💬 카카오톡 오픈채팅/채널 연결',
  SHOW_MODAL: '🔔 안내 모달(팝업) 띄우기',
  SUBMIT_FORM: '📩 신청/문의 폼 제출 및 카톡 알림',
  PG_CHECKOUT: '💳 신용카드/카카오페이 결제창 열기',
  DOWNLOAD_FILE: '💾 파일 다운로드 (안내장 등)',
  COPY_TO_CLIPBOARD: '📋 주소나 텍스트 복사하기',
  CUSTOM_INTERACTION: '✨ 커스텀 효과 / 대상 인터랙션 적용',
};

export const CUSTOM_EFFECT_OPTIONS = {
  TOGGLE_VISIBILITY: '👁️ 숨기기 / 보여주기 토글',
  COLOR_PRIMARY: '🎨 브랜드 색상으로 칠하기',
  COLOR_DANGER: '🔴 붉은색(경고)으로 칠하기',
  FADE_IN: '✨ 서서히 나타나기 (Fade In)',
  SHAKE: '👋 흔들림 (Shake)',
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
  table: '테이블형 (목록)',
  gallery: '갤러리형 (썸네일 위주)',
  list: '리스트형 (블로그 스타일)',
};

export const CHART_TYPE_OPTIONS = {
  bar: '막대(Bar) 차트',
  dot: '점(Dot) 차트',
  line: '라인(Line) 차트',
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
