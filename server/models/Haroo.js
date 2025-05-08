const mongoose = require('mongoose');

const { HAROO_DETAIL } = require('../constants');

// 하루 디폴트 스탯 15개
// [불친절도, 고백차인횟수, 연애횟수, 욕설지수, 애정표현력, 논리력, 공감능력, 감수성, 카리스마, 고집, 집중력, 꾸준함, 창의력, 자존감, 유머감각]

const HarooSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: HAROO_DETAIL.NAME_KOR_EN,
      maxlength: 15,
      trim: true,
      unique: true,
    },
    currentStats: [
      {
        label: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    statsHistory: [
      {
        date: {
          type: Date,
        },
        statChanges: [
          {
            label: { type: String, required: true },
            value: { type: Number, required: true },
          },
        ],
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
