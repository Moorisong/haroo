module.exports.normalizeDate = function(dateString) {
    const d = new Date(dateString);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  };