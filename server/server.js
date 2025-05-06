require('dotenv').config({ path: '.env.local' });

const { OpenAI } = require('openai'); // openai v4.x 기준
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://haroo.vercel.app'],
  credentials: true,
};

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

mongoose.set('strictQuery', true);

app.use(cors(corsOptions));
app.use(express.json());
app.listen(3001, () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log('mongoDB connected! port:3001'); // eslint-disable-line no-console
    })
    .catch((err) => console.log('error--->', err)); // eslint-disable-line no-console
});

app.post('/chat', async (req, res) => {
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
});
