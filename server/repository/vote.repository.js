const { getStartAndEndOfDay } = require('../utils');

const { Vote } = require('../models/Vote');

exports.findVoteByDate = async (normalizedDate) => {
  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(normalizedDate);
    return await Vote.findOne({ voteDate: { $gte: startOfDay, $lte: endOfDay } });
  } catch (err) {
    throw new Error(`Failed to find vote by date : ${err.message}`);
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
    throw new Error(`Failed to update vote : ${err.message}`);
  }
};

exports.updateVotedUserId = async (voteId, userId) => {
  const result = await Vote.updateOne(
    { _id: voteId, votedUserIds: { $ne: userId } },
    {
      $inc: { totalVotes: 1 },
      $push: { votedUserIds: userId },
      $set: { updatedAt: new Date() },
    },
  );
  if (result.modifiedCount === 0) throw new Error('이미 투표 하셨어요!');
  return result;
};
