const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { HAROO_DETAIL } = require('../constants');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  try {
    const doc = await Haroo.findOneAndUpdate(
      { name: HAROO_DETAIL.NAME_KOR_EN },
      {
        $set: {
          currentStats: data.UpdatedStats,
        },
        $push: {
          statsHistory: {
            date: new Date(),
            statChanges: data.statChanges,
          },
        },
      },
      {
        new: true, // 업데이트된 문서를 반환함
        upsert: true, // 문서가 없으면 새로 생성
      },
    );
    return doc;
  } catch (err) {
    throw new Error('Error while saving or updating Haroo: ' + err.message);
  }
};

// 하루 인사말, 이모지, 지식 DB 저장
exports.saveOrUpdateHarooContent = async (data) => {
  const today = new Date();

  try {
    const doc = await HarooContent.findOneAndUpdate(
      { date: today },
      {
        $set: {
          greeting: data.greeting,
          emoticon: data.asciiArt,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return doc;
  } catch (err) {
    throw new Error('Error while saving or updating Haroo content: ' + err.message);
  }
};

exports.saveOrUpdateVote = async (data) => {
  try {
  } catch (err) {}
};
