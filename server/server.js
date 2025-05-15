require('dotenv').config({ path: '.env.local' });
require('./jobs/cron');

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

// eslint-disable-next-line import/order
const connectDB = require('./config/db');
const app = express();

const harooRoutes = require('./routes/harooRoutes');
const dailyHarooRoutes = require('./routes/dailyHarooRoutes');
const authRoutes = require('./routes/authRoutes');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://haroo.vercel.app'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/init', harooRoutes);
app.use('/api/haroo/today', dailyHarooRoutes);
app.use('/auth', authRoutes);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log('mongoDB connected! port:3001'); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.error('DB 연결 실패:', err); // eslint-disable-line no-console
  });
