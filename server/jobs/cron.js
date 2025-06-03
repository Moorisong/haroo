const cron = require('node-cron');

const { getPromptMessage } = require('../prompt/promptMessage');
const { saveOrUpdateHaroo, saveOrUpdateHarooContent, saveOrUpdateVote } = require('../services/harooService');
const { requestGPT } = require('../services/gptService');

cron.schedule(
  '30 23 * * *',
  async () => {
    try {
      console.log('크론 시작 - GPT 요청 중...'); // eslint-disable-line no-console
      const prompt = await getPromptMessage();
      const parsedResult = await requestGPT(prompt);

      await saveOrUpdateHaroo(parsedResult.harooStats);
      await saveOrUpdateHarooContent(parsedResult.harooGreeting);
      await saveOrUpdateVote(parsedResult.vote);

      console.log('크론 완료 - 데이터 저장 성공'); // eslint-disable-line no-console
    } catch (err) {
      console.error('크론 에러:', err); // eslint-disable-line no-console
    }
  },
  {
    timezone: 'Asia/Seoul',
  },
);
