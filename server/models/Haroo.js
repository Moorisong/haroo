const mongoose = require('mongoose');

// 하루 스탯 고정 값
const statFields = {
  불친절도: { type: Number, default: 0 },
  고백차인횟수: { type: Number, default: 0 },
  연애횟수: { type: Number, default: 0 },
  욕설지수: { type: Number, default: 0 },
  애정표현력: { type: Number, default: 0 },
  논리력: { type: Number, default: 0 },
  공감능력: { type: Number, default: 0 },
  감수성: { type: Number, default: 0 },
  카리스마: { type: Number, default: 0 },
  고집: { type: Number, default: 0 },
  집중력: { type: Number, default: 0 },
  꾸준함: { type: Number, default: 0 },
  창의력: { type: Number, default: 0 },
  자존감: { type: Number, default: 0 },
  유머감각: { type: Number, default: 0 },
};

const HarooSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '하루(Haroo)',
      maxlength: 15,
      trim: true,
      unique: true,
    },
    currentStats: {
      type: Map,
      of: {
        type: Number,
        default: 0,
      },
      default: statFields, // 기본값으로 모든 스탯을 0으로 설정
    },
    statsHistory: [
      {
        date: {
          type: Date,
          required: true,
        },
        statChanges: {
          type: Map,
          of: Number,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // 자동으로 createdAt과 updatedAt을 기록
  },
);

// 6개월(180일) 동안만 데이터를 유지하도록 설정
HarooSchema.index({ 'statsHistory.date': 1 }, { expireAfterSeconds: 180 * 24 * 60 * 60 });

const Haroo = mongoose.model('Haroo', HarooSchema);

module.exports = { Haroo };
