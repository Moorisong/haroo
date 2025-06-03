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

exports.updateVotedUserId = async (voteId, userId, optionIndex) => {
  const result = await Vote.updateOne(
    { _id: voteId, 'votedUsers.userId': { $ne: userId } }, // 중복 투표 방지
    {
      $inc: { totalVotes: 1 },
      $push: { votedUsers: { userId, optionIndex } },
      $set: { updatedAt: new Date() },
    },
  );
  if (result.modifiedCount === 0) throw new Error('이미 투표 하셨어요!');
  return result;
};

exports.findVoteStateByUserId = async (voteId, userId) => {
  try {
    const vote = await Vote.findOne(
      { _id: voteId, 'votedUsers.userId': userId },
      { 'votedUsers.$': 1 }, // 매칭되는 votedUsers 항목만 가져옴
    );

    if (!vote || !vote.votedUsers || vote.votedUsers.length === 0) {
      return { isVoted: false };
    }

    return {
      isVoted: true,
      optionIndex: vote.votedUsers[0].optionIndex,
    };
  } catch (err) {
    throw new Error(`Failed to check vote state: ${err.message}`);
  }
};
