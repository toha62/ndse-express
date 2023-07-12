const express = require('express');
// const { v4: uuid } = require('uuid');
// const Book = require('./Book');

// const library = [];

const app = express();

app.post('/api/user/login', (request, response) => {
  response.status(201);
  response.json({
    id: 1,
    mail: 'test@mail.ru',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
