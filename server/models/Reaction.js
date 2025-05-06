const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // 하루에 하나의 반응만
  },
  response: {
    type: String,
    required: true,
    maxlength: 300,
    trim: true,
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

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = { Reaction };
