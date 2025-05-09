const { normalizeDate } = require('../utils');

const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { Vote } = require('../models/Vote');
const { HAROO_DETAIL } = require('../constants');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let haroo = await Haroo.findOne({ name: HAROO_DETAIL.NAME_KOR_EN });

    // 문서가 아예 없을 경우: 새로 생성
    if (!haroo) {
      const newHaroo = new Haroo({
        name: HAROO_DETAIL.NAME_KOR_EN,
        currentStats: [],
        statsHistory: [{date: normalizeDate(today), statChanges:[]}],
      });
      await newHaroo.save();
      return newHaroo;
    }

    // 문서가 있고 어제 기록이 있을 경우: 업데이트
    const lastStatDate = haroo.statsHistory?.[haroo.statsHistory.length - 1]?.date;
    if (lastStatDate && normalizeDate(lastStatDate).getTime() === normalizeDate(yesterday).getTime()) {
      const updated = await Haroo.findOneAndUpdate(
        { name: HAROO_DETAIL.NAME_KOR_EN },
        {
          $set: {
            currentStats: data.UpdatedStats,
          },
          $push: {
            statsHistory: {
              date: normalizeDate(today),
              statChanges: data.statChanges,
            },
          },
        },
        {
          new: true,
        },
      );
      return updated;
    } else {
      // 어제 기록도 아니고 문서는 있으니 아무 것도 하지 않음
      return haroo;
    }
  } catch (err) {
    throw new Error('Error while saving or updating Haroo: ' + err.message);
  }
};

// 하루 인사말, 이모지, 지식 DB 저장
exports.saveOrUpdateHarooContent = async (data) => {
  const today = new Date();
  const nomalizedDate = {
    today: normalizeDate(today),
  };

  try {
    const doc = await HarooContent.findOneAndUpdate(
      { date: nomalizedDate.today },
      {
        $setOnInsert: {
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
    const today = new Date(data.todayPoll.date);
    const tomorrow = new Date(data.tomorrowPoll.date);

    const nomalizedDate = {
      today: normalizeDate(today),
      tomorrow: normalizeDate(tomorrow),
    };

    // Step 1: todayPoll 데이터 업데이트
    const doc = await Vote.findOneAndUpdate(
      { voteDate: nomalizedDate.today },
      {
        $set: {
          updatedAt: nomalizedDate.today,
          selectedOption: data.todayPoll.selectedOption,
          selectedVotesCnt: data.todayPoll.selectedVotesCnt,
          totalVotesCnt: data.todayPoll.totalVotesCnt,
        },
        $setOnInsert: {
          voteDate: nomalizedDate.today,
          topic: '첫 투표입니다.',
          options: ['a', 'b', 'c', 'd'],
          knowledge: '지식 영역입니다.',
          createdAt: nomalizedDate.today,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    // Step 2: tomorrowPoll 데이터 저장

    const tomorrowDoc = await Vote.findOneAndUpdate(
      { voteDate: nomalizedDate.tomorrow },
      {
        $setOnInsert: {
          topic: data.tomorrowPoll.topic,
          options: data.tomorrowPoll.options,
          selectedOption: '', // 내일은 아직 선택되지 않음
          selectedVotesCnt: 0, // 초기값
          totalVotesCnt: 0, // 초기값
          knowledge: data.tomorrowPoll.knowledge,
          createdAt: nomalizedDate.today,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return { todayVote: doc, tomorrowVote: tomorrowDoc };
  } catch (err) {
    throw new Error('Error while saving or updating vote data: ' + err.message);
  }
};
