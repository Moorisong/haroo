const { getStartAndEndOfDay } = require('../utils');

const { HarooContent } = require('../models/HarooContent');

exports.findHarooContent = async (normalizedDate) => {
  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(normalizedDate);
    return await HarooContent.findOne({ date: { $gte: startOfDay, $lte: endOfDay } });
  } catch (err) {
    throw new Error('Failed to find harooContent by date');
  }
};
