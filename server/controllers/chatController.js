const { OpenAI } = require('openai'); // openai v4.x 기준

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const chatWithGPT = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        { role: 'system', content: '당신은 친절한 챗봇입니다.' },
        { role: 'user', content: userMessage },
      ],
    });

    // ChatGPT의 응답을 프론트로 내려줌
    res.json({
      reply: completion.choices[0].message.content,
      raw: completion,
    });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI 응답 오류' });
  }
};

module.exports = { chatWithGPT };
