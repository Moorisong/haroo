const mongoose = require('mongoose');

const HarooContentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // 하루에 하나만
  },
  greeting: {
    type: String,
    required: true,
    maxlength: 300,
    trim: true,
  },
  emoticon: {
    type: String,
    maxlength: 200, // 3줄 정도 커버 가능
    required: true,
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

const HarooContent = mongoose.model('HarooContent', HarooContentSchema);

module.exports = { HarooContent };
