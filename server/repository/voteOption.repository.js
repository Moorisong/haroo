const { VoteOption } = require('../models/VoteOption');

exports.findVoteOptionAndUpdate = async (voteId, optionIndex) => {
  try {
    const updatedOption = await VoteOption.findOneAndUpdate(
      { voteId, optionIndex },
      {
        $inc: { votesCnt: 1 },
        $set: { updatedAt: new Date() },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return updatedOption;
  } catch (error) {
    throw new Error(`투표 저장 중 에러 발생: ${error.message}`);
  }
};
