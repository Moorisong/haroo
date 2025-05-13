const { getNormalizedDays } = require('../utils');

const { findLatestHarooStat } = require('../repository/haroo.repository');
const { findLatestHarooContent } = require('../repository/harooContent.repository');
const { findLatestVote, findVoteByDate } = require('../repository/vote.repository');

const dailyHaroo = async (req, res) => {
  try {
    let result = {};

    const { normalizedYesterday } = getNormalizedDays();

    const harooStatData = await findLatestHarooStat();
    const harooContentData = await findLatestHarooContent();
    const todayVoteData = await findLatestVote();
    const yesterdayVoteData = await findVoteByDate(normalizedYesterday);

    const dataMissing = !harooStatData || !todayVoteData || !todayVoteData[1] || !yesterdayVoteData;

    if (dataMissing) {
      // eslint-disable-next-line no-console
      console.log('missing data --- ', {
        harooStatData: !!harooStatData,
        todayVoteData: !!todayVoteData,
        todayVoteDataIndex1: todayVoteData ? !!todayVoteData[1] : false,
        yesterdayVoteData: !!yesterdayVoteData,
      });
      return res.status(404).json({ message: '데이터가 존재하지 않습니다.' });
    }

    result = {
      harooStat: {
        name: harooStatData.name,
        currentStats: harooStatData.currentStats,
        statsHistory: harooStatData.statsHistory,
        createdAt: harooStatData.createdAt,
        updatedAt: harooStatData.updatedAt,
      },
      harooContent: {
        emoticon: harooContentData.emoticon,
        greeting: harooContentData.greeting,
      },
      todayVote: {
        voteDate: todayVoteData[1].voteDate,
        topic: todayVoteData[1].topic,
        options: todayVoteData[1].options,
        knowledge: todayVoteData[1].knowledge,
      },
      lastStatChange: harooStatData.statsHistory.slice(-1)[0],
      yesterdayVote: yesterdayVoteData,
    };

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: '서버에서 오류가 발생했습니다' });
    throw new Error(`faild in dailyHaroo : ${err.message}`);
  }
};
module.exports = { dailyHaroo };
