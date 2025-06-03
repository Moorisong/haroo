const { updateVotedUserId } = require('../repository/vote.repository');
const { findVoteOptionAndUpdate } = require('../repository/voteOption.repository');
const { decodeToken } = require('../utils/jwtUtils');

const submitVotedData = async (req, res) => {
  try {
    const { voteId, optionIndex } = req.body;
    const newVoteOptionData = await findVoteOptionAndUpdate(voteId, optionIndex);
    const { userId } = decodeToken(req.cookies.accessToken);

    await updateVotedUserId(voteId, userId);

    return res.status(200).json(newVoteOptionData);
  } catch (err) {
    return res.status(409).json({ error: `occured error during submiting voted data : ${err.message}` });
  }
};

module.exports = { submitVotedData };
