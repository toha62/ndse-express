const express = require('express');
const Book = require('./Book');

const library = [new Book('Война и мир', 'Л.Н.Толстой'), new Book('Академия', 'А.Азимов')];

const app = express();

app.use(express.json());

app.post('/api/user/login', (request, response) => {
  response.status(201);
  response.json({
    id: 1,
    mail: 'test@mail.ru',
  });
});

app.get('/api/books', (request, response) => {
  response.json(library);
});

app.get('/api/books/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }
  response.json(library[index]);
});

app.post('/api/books', (request, response) => {
  const {
    title, authors, description, favorite, fileCover, fileName,
  } = request.body;

  const book = new Book(title, authors, description, favorite, fileCover, fileName);

  library.push(book);

  response.status(201);
  response.json(book);
});

app.put('/api/books/:id', (request, response) => {
  const {
    title, authors, description, favorite, fileCover, fileName,
  } = request.body;
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }

  library[index] = {
    ...library[index],
    title,
    authors,
    description,
    favorite,
    fileCover,
    fileName,
  };

  response.status(200);
  response.json(library[index]);
});

app.delete('/api/books/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }

  library.splice(index, 1);
  response.json('Ok');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
