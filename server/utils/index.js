const { TEXT } = require('../constants');

function normalizeDate(dateInput) {
  const d = new Date(dateInput || new Date());
  d.setHours(0, 0, 0, 0);
  return d;
}

function getStartAndEndOfDay(date) {
  const d = new Date(date); // date는 이미 normalize됨
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return { startOfDay: start, endOfDay: end };
}

function getTomorrowDate() {
  const today = new Date();

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return tomorrow;
}

function getYesterdayDate() {
  const today = new Date();

  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return yesterday;
}

function getNormalizedDays(date = false) {
  const today = new Date();
  const normalizedToday = normalizeDate(today);

  const tomorrow = getTomorrowDate();
  const normalizedTomorrow = normalizeDate(tomorrow);

  const yesterday = getYesterdayDate();
  const normalizedYesterday = normalizeDate(yesterday);

  const normalizedDate = normalizeDate(date);

  return { normalizedToday, normalizedTomorrow, normalizedYesterday, normalizedDate };
}

function getCookieOption(maxAge) {
  const isProd = process.env.NODE_ENV === TEXT.ENV.PROD;
  const result = {
    accessToken: {
      httpOnly: true, // JavaScript에서 접근할 수 없도록 설정
      secure: isProd, // https 환경에서만 쿠키 set
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: maxAge.accessTokenMaxAge, // 쿠키 만료 시간
    },
    refreshToken: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: maxAge.refreshTokenMaxAge,
    },
  };
  return result;
}

module.exports = {
  normalizeDate,
  getStartAndEndOfDay,
  getTomorrowDate,
  getYesterdayDate,
  getNormalizedDays,
  getCookieOption,
};
