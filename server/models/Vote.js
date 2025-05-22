const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voteDate: {
    type: Date,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  options: {
    type: [String],
    required: true,
    maxlength: 4,
  },
  selectedOption: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  knowledge: {
    type: String,
    maxlength: 900,
    trim: true,
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
