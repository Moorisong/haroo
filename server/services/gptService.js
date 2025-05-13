const { getNormalizedDays } = require('../utils');

const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { HAROO_DETAIL, TEXT } = require('../constants');
const { findVoteAndUpdate } = require('../repository/vote.repository');
const { findHarooContentByDate } = require('../repository/harooContent.repository');
const { findHarooByName, findHarooAndUpdate } = require('../repository/haroo.repository');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  try {
    let haroo = await findHarooByName();
    const lastStatDate = haroo.statsHistory?.[haroo.statsHistory.length - 1]?.date;

    const { normalizedToday, normalizedYesterday, normalizedDate } = getNormalizedDays(lastStatDate);
    const normalizedLastStatDate = normalizedDate;

    const isUpdatePossible = normalizedLastStatDate.getTime() === normalizedYesterday.getTime();

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

    // 문서가 있고 최신 기록의 날짜가 어제 날짜일 경우: 업데이트
    if (isUpdatePossible) {
      const updated = await findHarooAndUpdate(data);
      return updated;
    }
    return haroo;
  } catch (err) {
    throw new Error(`Error while saving or updating Haroo: ${err.message}`);
  }
};

// 하루 인사말, 이모지, 지식 DB 저장
exports.saveOrUpdateHarooContent = async (data) => {
  const { normalizedToday, normalizedTomorrow } = getNormalizedDays();

  const todayDoc = await findHarooContentByDate(normalizedToday);
  const tomorrowDoc = await findHarooContentByDate(normalizedTomorrow);
  try {
    let newHarooContent;

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

    // 오늘과 내일 모두 있다: 아무 일도 안 일어남
    if (newHarooContent) {
      await newHarooContent.save();
    }
  } catch (err) {
    throw new Error(`Error while saving or updating Haroo content: ${err.message}`);
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
      topic: TEXT.INITTIAL.VOTE.TOPIC,
      options: TEXT.INITTIAL.VOTE.OPTIONS,
      knowledge: TEXT.INITTIAL.VOTE.KNOWLEDGE,
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
    throw new Error(`Error while saving or updating vote data: ${err.message}`);
  }
};
