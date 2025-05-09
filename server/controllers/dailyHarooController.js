const { Haroo } = require('../models/Haroo');
const { HarooContent } = require('../models/HarooContent');
const { Vote } = require('../models/Vote');

const dailyHaroo = async (req, res) => {
  try {
    let result = {};
    const harooStatData = await Haroo.findOne().sort({ date: -1 });
    const harooContentData = await HarooContent.findOne().sort({ date: -1 });
    const voteData = await Vote.find().sort({ voteDate: -1 });

    if (!harooStatData) {
      return res.status(404).json({ message: '하루 데이터가 존재하지 않습니다.' });
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
        greeting: harooContentData.emoticon + harooContentData.greeting,
      },
      todayVote: {
        voteDate: voteData[1].voteDate,
        topic: voteData[1].topic,
        options: voteData[1].options,
        knowledge: voteData[1].knowledge,
      },
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  }
};
module.exports = { dailyHaroo };
