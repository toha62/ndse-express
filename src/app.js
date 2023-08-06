const express = require('express');

const pagesRouter = require('./routes/pages');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', pagesRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 3000;
const COUNTER_URL = process.env.COUNTER_URL || 'locallhost';

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
  console.log('Counter URL: ', COUNTER_URL);
});
