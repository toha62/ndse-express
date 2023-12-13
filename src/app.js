const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const pagesRouter = require('./routes/pages');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', pagesRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

async function start(PORT, DB_URL) {
  try {
    await mongoose.connect(DB_URL, {
      dbName: 'library',
    });
    console.log('Mongoose connected');

    app.listen(PORT, () => {
      console.log(`Server listening port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line prefer-destructuring
const DB_URL = process.env.DB_URL;

start(PORT, DB_URL);
