const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');

const constants = require('./constants');

const envPath = process.env.NODE_ENV === constants.ENV.DEV ? '.env.local' : '.env.production';

dotenv.config({ path: path.resolve(__dirname, `../${envPath}`) });

require('./jobs/cron');

// eslint-disable-next-line import/order
const connectDB = require('./config/db');
const app = express();
const harooRoutes = require('./routes/harooRoutes');
const dailyHarooRoutes = require('./routes/dailyHarooRoutes');
const authRoutes = require('./routes/authRoutes');
const voteOptionRoutes = require('./routes/voteOptionRoutes');

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://haroo.vercel.app'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/init', harooRoutes);
app.use('/api/today', dailyHarooRoutes);
app.use('/auth', authRoutes);
app.use('/vote', voteOptionRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`mongoDB connected! port:${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((err) => {
    console.error('DB 연결 실패:', err); // eslint-disable-line no-console
  });
