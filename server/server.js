require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');
const express = require('express');

const app = express();

mongoose.set('strictQuery', true);

app.listen(3001, () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log('mongoDB connected! port:3001'); // eslint-disable-line no-console
    })
    .catch((err) => console.log('error--->', err)); // eslint-disable-line no-console
});
