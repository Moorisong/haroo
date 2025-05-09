const { OpenAI } = require('openai'); // openai v4.x 기준

const { saveOrUpdateHaroo, saveOrUpdateHarooContent, saveOrUpdateVote } = require('../services/gptService');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const chatWithGPT = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const { choices } = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: '당신은 친절한 챗봇입니다.' },
        { role: 'user', content: userMessage },
      ],
    });

    // GPT 응답 내용 추출 및 유효성 검사
    const result = choices?.[0]?.message?.content;
    if (!result) {
      throw new Error('GPT 응답이 유효하지 않음');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (err) {
      throw new Error('GPT 응답 파싱 오류');
    }

    await saveOrUpdateHaroo(parsedResult.harooStats);
    await saveOrUpdateHarooContent(parsedResult.harooGreeting);
    await saveOrUpdateVote(parsedResult.vote);

    // 결과 반환
    res.json(parsedResult);
  } catch (err) {
    res.status(500).json({ error: err.message || '서버 에러' });
  }
};

module.exports = { chatWithGPT };
