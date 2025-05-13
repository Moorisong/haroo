const { getStartAndEndOfDay } = require('../utils');

const { HarooContent } = require('../models/HarooContent');

exports.findHarooContentByDate = async (normalizedDate) => {
  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(normalizedDate);
    return await HarooContent.findOne({ date: { $gte: startOfDay, $lte: endOfDay } });
  } catch (err) {
    throw new Error(`Failed to find harooContent by date : ${err.message}`);
  }
};

exports.findLatestHarooContent = async () => {
  try {
    return await HarooContent.findOne().sort({ date: -1 });
  } catch (err) {
    throw new Error(`Failed to find haroo content  by sort latest ${err.message} `);
  }
};
