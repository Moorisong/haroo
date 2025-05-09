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

module.exports = {
  normalizeDate,
  getStartAndEndOfDay,
};
