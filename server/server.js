require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');

const connectDB = require('./congif/db');
const app = express();
const harooRoutes = require('./routes/harooRoutes');
const chatRoutes = require('./routes/chatRoutes');
const dailyHarooRoutes = require('./routes/dailyHarooRoutes');
const authRoutes = require('./routes/authRoutes');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://haroo.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(3001, () => {
  connectDB();
});
app.use('/api/init', harooRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/haroo/today', dailyHarooRoutes);
app.use('/auth', authRoutes);
