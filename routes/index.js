const express = require('express');

const router = express.Router();
const upload = require('../middleware/upload');
const Book = require('../Book');

const library = [new Book('Война и мир', 'Л.Н.Толстой'), new Book('Академия', 'А.Азимов')];

router.post('/api/user/login', (request, response) => {
  response.status(201);
  response.json({
    id: 1,
    mail: 'test@mail.ru',
  });
});

router.get('/api/books', (request, response) => {
  response.json(library);
});

router.get('/api/books/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }
  response.json(library[index]);
});

router.post(
  '/api/books',
  upload.single('book-file'),
  (request, response) => {
    if (request.file) {
      const {
        title, authors, description, favorite, fileCover, fileName,
      } = request.body;
      const fileBook = request.file.filename;

      const book = new Book(title, authors, description, favorite, fileCover, fileName, fileBook);

      library.push(book);

      response.status(201);
      response.json(book);
    }
    response.json('File not found');
  },
);

router.put('/api/books/:id', (request, response) => {
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

router.delete('/api/books/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }

  library.splice(index, 1);
  response.json('Ok');
});

router.get('/api/books/:id/download', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    response.json('404 Страница не найдена');
  }

  response.download(`${__dirname}/../storage/${library[index].fileBook}`, err => {
    if (err) {
      response.status(404).json(err);
    }
  });
});

module.exports = router;
