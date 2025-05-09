const { normalizeDate } = require('../utils');

const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { Vote } = require('../models/Vote');
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
