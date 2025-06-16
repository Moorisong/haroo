const constants = require('../constants');

function normalizeDate(dateInput) {
  const d = new Date(dateInput || new Date());
  d.setHours(0, 0, 0, 0);
  return d;
}

function getStartAndEndOfDay(date) {
  const d = new Date(date);

  const startOfDay = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999));

  return { startOfDay, endOfDay };
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

function subtractOneDayUTC(date) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() - 1);
  return result;
}

function getCookieOption(maxAge) {
  const isProd = process.env.NODE_ENV === constants.ENV.PROD;
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
  subtractOneDayUTC,
  getCookieOption
};
