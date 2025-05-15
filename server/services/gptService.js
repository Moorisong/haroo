const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

async function requestGPT(userMessage) {
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: '당신은 친절한 챗봇입니다.' },
      { role: 'user', content: userMessage },
    ],
  });

  const result = choices?.[0]?.message?.content;
  if (!result) throw new Error('GPT 응답이 유효하지 않음');

  let parsedResult;
  try {
    parsedResult = JSON.parse(result);
  } catch (err) {
    throw new Error(`GPT 응답 파싱 오류 : ${err.message}`);
  }

  return parsedResult;
}

module.exports = { requestGPT };
