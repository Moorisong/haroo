const { findOneAndUpdate } = require('../repository/voteOption.repository');

const submitVotedData = async (req, res) => {
  try {
    const { voteId, optionIndex } = req.body;
    const newVoteOpionData = await findOneAndUpdate(voteId, optionIndex);

    return res.status(200).json(newVoteOpionData);
  } catch (err) {
    throw new Error(`occured error during submiting voted data : ${err.message}`);
  }
};

module.exports = { submitVotedData };
