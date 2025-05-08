const { Haroo } = require('../models/Haroo');
const { HAROO_DETAIL } = require('../constants');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  try {
    const doc = await Haroo.findOneAndUpdate(
      { name: HAROO_DETAIL.NAME_KOR_EN },
      {
        $set: {
          currentStats: data.harooStats.UpdatedStats,
        },
        $push: {
          statsHistory: {
            date: new Date(),
            statChanges: data.harooStats.statChanges,
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
