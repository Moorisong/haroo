const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voteDate: {
    type: Date,
    required: true,
    unique: true, // 하루에 하나만 생성됨
  },
  voteOptions: [
    {
      topic: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      option: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      votes: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalVotesCnt: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  ],
  statChanges: {
    type: Map,
    of: Number,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // 생성일은 변경 불가
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = { Vote };