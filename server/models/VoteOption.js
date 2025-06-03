const mongoose = require('mongoose');

const VoteOptionSchema = new mongoose.Schema({
  voteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote',
    required: true,
  },
  optionIndex: {
    type: Number,
    required: true,
  },
  votesCnt: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const VoteOption = mongoose.model('VoteOption', VoteOptionSchema);

module.exports = { VoteOption };
