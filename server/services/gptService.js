const { normalizeDate, getNormalizedDays } = require('../utils');

const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { HAROO_DETAIL } = require('../constants');
const { findVoteAndUpdate } = require('../repository/vote.repository');
const { findHarooContent } = require('../repository/harooContent.repository');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  try {
    const today = new Date();
    const normalizedToday = normalizeDate(today);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let haroo = await Haroo.findOne({ name: HAROO_DETAIL.NAME_KOR_EN });

    // 문서가 아예 없을 경우: 새로 생성
    if (!haroo) {
      const newHaroo = new Haroo({
        name: HAROO_DETAIL.NAME_KOR_EN,
        currentStats: [],
        statsHistory: [{ date: normalizedToday, statChanges: [] }],
      });
      await newHaroo.save();
      return newHaroo;
    }

    // 문서가 있고 어제 기록이 있을 경우: 업데이트
    const lastStatDate = haroo.statsHistory?.[haroo.statsHistory.length - 1]?.date;
    const normalizedLastStatDate = normalizeDate(lastStatDate);
    const normalizedYesterday = normalizeDate(yesterday);

    if (normalizedLastStatDate.getTime() === normalizedYesterday.getTime()) {
      const updated = await Haroo.findOneAndUpdate(
        { name: HAROO_DETAIL.NAME_KOR_EN },
        {
          $set: {
            currentStats: data.updatedStats,
          },
          $push: {
            statsHistory: {
              date: normalizedToday,
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
  const { normalizedToday, normalizedTomorrow } = getNormalizedDays();

  const todayDoc = findHarooContent(normalizedToday);
  const tomorrowDoc = findHarooContent();

  try {
    let newHarooContent = null;

    if (!todayDoc) {
      // 오늘 데이터가 없다 : 오늘 날짜로 생성
      newHarooContent = new HarooContent({
        date: normalizedToday,
        greeting: data.greeting,
        emoticon: data.asciiArt,
      });
    } else if (todayDoc && !tomorrowDoc) {
      // 오늘 데이터는 있는데 내일 데이터가 없다 : 내일 날짜로 생성
      newHarooContent = new HarooContent({
        date: normalizedTomorrow,
        greeting: data.greeting,
        emoticon: data.asciiArt,
      });
    }
    await newHarooContent.save();
  } catch (err) {
    throw new Error('Error while saving or updating Haroo content: ' + err.message);
  }
};

// 투표 데이터 저장
exports.saveOrUpdateVote = async (data) => {
  const { normalizedToday, normalizedTomorrow } = getNormalizedDays();

  const todayOption = {
    set: {
      updatedAt: new Date(),
      selectedOption: data.todayPoll.selectedOption,
      selectedVotesCnt: data.todayPoll.selectedVotesCnt,
      totalVotesCnt: data.todayPoll.totalVotesCnt,
    },
    setOnInsert: {
      voteDate: normalizedToday,
      topic: '첫 투표입니다.',
      options: ['a', 'b', 'c', 'd'],
      knowledge: '지식 영역입니다.',
      createdAt: new Date(),
    },
  };

  const tomorrowOption = {
    setOnInsert: {
      voteDate: normalizedTomorrow,
      topic: data.tomorrowPoll.topic,
      options: data.tomorrowPoll.options,
      selectedOption: '', // 내일은 아직 선택되지 않음
      selectedVotesCnt: 0, // 초기값
      totalVotesCnt: 0, // 초기값
      knowledge: data.tomorrowPoll.knowledge,
      createdAt: new Date(),
    },
  };

  try {
    // Step 1: todayPoll 데이터 업데이트 및 저장
    const todayDoc = await findVoteAndUpdate(normalizedToday, todayOption);

    // Step 2: tomorrowPoll 데이터 저장
    const tomorrowDoc = await findVoteAndUpdate(normalizedTomorrow, tomorrowOption);

    return { todayVote: todayDoc, tomorrowVote: tomorrowDoc };
  } catch (err) {
    throw new Error('Error while saving or updating vote data: ' + err.message);
  }
};
