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
  } catch (err) {
    throw new Error(`투표 저장 중 에러 발생: ${err.message}`);
  }
};

exports.findVoteOptionByVoteId = async (voteId) => {
  try {
    return await VoteOption.find({ voteId });
  } catch (err) {
    throw new Error(`투표 항목 데이터 로딩 중 에러 발생: ${err.message}`);
  }
};
