const express = require('express');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
