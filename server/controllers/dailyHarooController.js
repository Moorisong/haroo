const { getNormalizedDays } = require('../utils');

const { findLatestHarooStat } = require('../repository/haroo.repository');
const { findHarooContentByDate } = require('../repository/harooContent.repository');
const { findVoteByDate, findVoteStateByUserId } = require('../repository/vote.repository');
const { decodeToken } = require('../utils/jwtUtils');

const dailyHaroo = async (req, res) => {
  try {
    let result = {};

    const { userId } = decodeToken(req.cookies.accessToken);
    const { normalizedToday, normalizedYesterday } = getNormalizedDays();

    const harooStatData = await findLatestHarooStat();
    const harooContentData = await findHarooContentByDate(normalizedToday);

    const todayVoteData = await findVoteByDate(normalizedToday);
    const yesterdayVoteData = await findVoteByDate(normalizedYesterday);

    const dataMissing = !harooStatData || !todayVoteData || !todayVoteData || !yesterdayVoteData;

    if (dataMissing) {
      // eslint-disable-next-line no-console
      console.log('missing data --- ', {
        harooStatData: !!harooStatData,
        todayVoteData: !!todayVoteData,
        todayVoteDataIndex1: !!todayVoteData,
        yesterdayVoteData: !!yesterdayVoteData,
      });
      return res.status(404).json({ message: '데이터가 존재하지 않습니다.', isFallback: true });
    }

    const todayUserVoteState = await findVoteStateByUserId(todayVoteData._id, userId);

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
      todayVote: todayVoteData,
      lastStatChange: harooStatData.statsHistory.slice(-1)[0],
      yesterdayVote: yesterdayVoteData,
      todayUserVoteState,
    };

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: '서버에서 오류가 발생했습니다', isFallback: true });
    throw new Error(`faild in dailyHaroo : ${err.message}`);
  }
};
module.exports = { dailyHaroo };
