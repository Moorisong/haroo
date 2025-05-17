const { Haroo } = require('../models/Haroo');
const { HAROO_DETAIL } = require('../constants');

exports.findHaroo = async () => {
  try {
    return await Haroo.findOne({ name: HAROO_DETAIL.NAME_KOR_EN });
  } catch (err) {
    throw new Error(`Failed to find haroo by name : ${err.message}`);
  }
};

exports.findLatestHarooStat = async () => {
  try {
    return await Haroo.findOne().sort({ date: -1 });
  } catch (err) {
    throw new Error(`Failed to find haroo stat by sort latest : ${err.message}`);
  }
};

exports.findHarooAndUpdate = async (data, normalizedDate) => {
  try {
    return await Haroo.findOneAndUpdate(
      { name: HAROO_DETAIL.NAME_KOR_EN },
      {
        $set: {
          currentStats: data.updatedStats,
        },
        $push: {
          statsHistory: {
            date: normalizedDate,
            statChanges: data.statChanges,
          },
        },
      },
      {
        new: true,
      },
    );
  } catch (err) {
    throw new Error(`Failed to find and update haroo : ${err.message}`);
  }
};

exports.createHaroo = async (normalizedToday) => {
  try {
    const newHaroo = new Haroo({
      name: HAROO_DETAIL.NAME_KOR_EN,
      currentStats: [],
      statsHistory: [{ date: normalizedToday, statChanges: [] }],
    });
    await newHaroo.save();
    return newHaroo;
  } catch (err) {
    throw new Error(`Failed to create haroo ${err.message}`);
  }
};
