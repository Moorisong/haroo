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

exports.createHarooContent = async (normalizedDate, data) => {
  try {
    const newHarooContent = new HarooContent({
      date: normalizedDate,
      greeting: data.greeting || undefined,
      emoticon: data.asciiArt || undefined,
    });
    await newHarooContent.save();
  } catch (err) {
    throw new Error(`Failed to create haroo content : ${err.message}`);
  }
};
