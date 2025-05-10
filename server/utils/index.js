function normalizeDate(dateInput) {
  const d = new Date(dateInput);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getStartAndEndOfDay(date) {
  const d = new Date(date); // date는 이미 normalize됐다고 가정
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return { startOfDay: start, endOfDay: end };
}

function getTomorrowDate() {
  const today = new Date();

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() - +1);

  return tomorrow;
}

function getYesterdayDate() {
  const today = new Date();

  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return yesterday;
}

function getNormalizedDays() {
  const today = new Date();
  const normalizedToday = normalizeDate(today);

  const tomorrow = getTomorrowDate();
  const normalizedTomorrow = normalizeDate(tomorrow);

  const yesterday = getYesterdayDate();
  const normalizedYesterday = normalizeDate(yesterday);

  return { normalizedToday, normalizedTomorrow, normalizedYesterday };
}

module.exports = {
  normalizeDate,
  getStartAndEndOfDay,
  getTomorrowDate,
  getYesterdayDate,
  getNormalizedDays,
};
