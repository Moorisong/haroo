const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected!'); // eslint-disable-line no-console
  } catch (err) {
    console.error('❌ MongoDB connection error:', err); // eslint-disable-line no-console
    process.exit(1); // 서버 중단
  }
};

module.exports = connectDB;
