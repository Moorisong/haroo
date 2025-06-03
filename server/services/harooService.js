const { getNormalizedDays } = require('../utils');

const { TEXT } = require('../constants');
const { findVoteAndUpdate, findVoteByDate } = require('../repository/vote.repository');
const { findHarooContentByDate, createHarooContent } = require('../repository/harooContent.repository');
const { findHaroo, findHarooAndUpdate, createHaroo } = require('../repository/haroo.repository');
const { findVoteOptionByVoteId } = require('../repository/voteOption.repository');

// 하루 최신 스탯, 스탯 변경 내역 DB 저장
exports.saveOrUpdateHaroo = async (data) => {
  let haroo = await findHaroo();
  const { normalizedToday, normalizedYesterday } = getNormalizedDays();

  if (!haroo) return createHaroo(normalizedToday);

  try {
    const lastStatDate = haroo.statsHistory?.[haroo.statsHistory.length - 1]?.date;
    const { normalizedDate: normalizedLastStatDate } = getNormalizedDays(lastStatDate);

    // 문서가 있고 최신 기록의 날짜가 어제 날짜일 경우: 업데이트
    const isUpdatePossible = normalizedLastStatDate.getTime() === normalizedYesterday.getTime();

    if (isUpdatePossible) {
      const updated = await findHarooAndUpdate(data, normalizedToday);
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
    if (!todayDoc) {
      // 오늘 데이터가 없다 : 오늘 날짜로 생성
      await createHarooContent(normalizedToday, data);
    } else if (todayDoc && !tomorrowDoc) {
      // 오늘 데이터는 있는데 내일 데이터가 없다 : 내일 날짜로 생성
      await createHarooContent(normalizedTomorrow, data);
    }
    // 오늘과 내일 모두 있다: 아무 일도 안 일어남
  } catch (err) {
    throw new Error(`Error while saving or updating Haroo content: ${err.message}`);
  }
};

// 투표 메타 데이터 저장
exports.saveOrUpdateVote = async (data) => {
  const { normalizedToday, normalizedTomorrow } = getNormalizedDays();

  let todayVote = await findVoteByDate(normalizedToday);

  if (todayVote) {
    // 오늘 데이터 있으면 업데이트
    const todayVoteOptionsData = await findVoteOptionByVoteId(todayVote._id);
    const topOptionIdx = this.pickTopVoteOptionIndex(todayVoteOptionsData);

    if (topOptionIdx !== undefined) {
      todayVote.selectedOption = todayVote.options?.[topOptionIdx];
    } else {
      todayVote.selectedOption = undefined; // 필드가 MongoDB에 저장되지 않음
    }

    todayVote.updatedAt = new Date();
    await todayVote.save();
  } else {
    // 오늘 데이터 없으면 새로 생성
    todayVote = await findVoteAndUpdate(normalizedToday, {
      setOnInsert: {
        voteDate: normalizedToday,
        topic: TEXT.INITIAL.VOTE.TOPIC,
        options: TEXT.INITIAL.VOTE.OPTIONS,
        knowledge: TEXT.INITIAL.VOTE.KNOWLEDGE,
        createdAt: new Date(),
      },
    });
  }

  // 내일 데이터 upsert
  const tomorrowDoc = await findVoteAndUpdate(normalizedTomorrow, {
    setOnInsert: {
      voteDate: normalizedTomorrow,
      topic: data.tomorrowPoll.topic,
      options: data.tomorrowPoll.options,
      knowledge: data.tomorrowPoll.knowledge,
      createdAt: new Date(),
    },
  });

  return { todayVote, tomorrowVote: tomorrowDoc };
};

// 투표 항목 중 1위 항목 index 추출
exports.pickTopVoteOptionIndex = (voteOptions) => {
  if (!Array.isArray(voteOptions) || voteOptions.length === 0) {
    return undefined;
  }

  const maxCount = Math.max(...voteOptions.map((e) => e.votesCnt));
  const topOptions = voteOptions.filter((opt) => opt.votesCnt === maxCount);
  const winner = topOptions[Math.floor(Math.random() * topOptions.length)];

  return winner.optionIndex;
};
