const express = require('express');
const axios = require('axios');

const router = express.Router();
const upload = require('../middleware/upload');
const Book = require('../Book');

const COUNTER_URL = process.env.COUNTER_URL || 'locallhost';
const instance = axios.create({
  baseURL: `http://${COUNTER_URL}`,
});

const library = [
  new Book('Война и мир', 'Л.Н.Толстой', 'Русская классика', ''),
  new Book('Академия', 'А.Азимов', 'Фантастика', 't'),
];

router.get('/', (request, response) => {
  response.render('../src/views/pages//index', { books: library });
  // response.json(library);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    return response.json('404 Страница не найдена');
  }
  console.log('Counter URL: ', COUNTER_URL);
  const counterResponse = await instance.get(`/counter/${id}`);

  console.log(counterResponse.data);

  return response.render('../src/views/pages//view', { book: library[index], counter: counterResponse.data });

  // response.json(library[index]);
});

router.get('/update/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    return response.json('404 Страница не найдена');
  }
  return response.render('../src/views/pages/update', { book: library[index] });
});

router.post(
  '/',
  // upload.single('book-file'),
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const {
        title, authors, description, favorite,
      } = request.body;
      const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      const book = new Book(title, authors, description, favorite, fileCover, fileName, fileBook);

      library.push(book);

      response.status(201);
      return response.redirect('/api/books');
      // response.json(book);
    }
    return response.json('File not found');
  },
);

router.post(
  '/:id',
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const { id } = request.params;
      const index = library.findIndex(item => item.id === id);

      if (index === -1) {
        response.status(404);
        return response.json('404 Страница не найдена');
      }

      const {
        title, authors, description, favorite,
      } = request.body;
      const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      library[index] = {
        ...library[index],
        title,
        authors,
        description,
        favorite,
        fileCover,
        fileName,
        fileBook,
      };

      response.status(200);
      return response.redirect('/api/books');
      // response.json(library[index]);
    }
    return response.json('File not found');
  },
);

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    return response.json('404 Страница не найдена');
  }

  library.splice(index, 1);
  return response.json('Ok');
});

router.get('/:id/download', (request, response) => {
  const { id } = request.params;
  const index = library.findIndex(item => item.id === id);

  if (index === -1) {
    response.status(404);
    return response.json('404 Страница не найдена');
  }

  return response.download(`${__dirname}/../storage/${library[index].fileBook}`, err => {
    if (err) {
      response.status(404).json(err);
    }
  });
});

module.exports = router;
