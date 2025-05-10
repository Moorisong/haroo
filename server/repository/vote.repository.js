const { getStartAndEndOfDay } = require('../utils');

const { Vote } = require('../models/Vote');

exports.findVoteByDate = async (normalizedDate) => {
  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(normalizedDate);
    return await Vote.findOne({ voteDate: { $gte: startOfDay, $lte: endOfDay } });
  } catch (err) {
    throw new Error('Failed to find vote by date');
  }
};

exports.findLatestVote = async () => {
  try {
    return await Vote.find().sort({ voteDate: -1 });
  } catch (err) {
    throw new Error('Failed to find vote by sort latest ');
  }
};

exports.findVoteAndUpdate = async (normalizedDate, option) => {
  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(normalizedDate);
    return await Vote.findOneAndUpdate(
      { voteDate: { $gte: startOfDay, $lte: endOfDay } },
      {
        ...(option.set ? { $set: option.set } : {}),
        ...(option.setOnInsert ? { $setOnInsert: option.setOnInsert } : {}),
      },
      { new: true, upsert: true },
    );
  } catch (err) {
    throw new Error('Failed to update vote');
  }
};
