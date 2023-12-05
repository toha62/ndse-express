const express = require('express');
const axios = require('axios');
const upload = require('../middleware/upload');
const Books = require('../models/booksSchema');

const router = express.Router();
const COUNTER_URL = process.env.COUNTER_URL || 'locallhost';
const instance = axios.create({
  baseURL: COUNTER_URL,
});

// начальное заполнение БД для тестирования
(async function fillDB() {
  try {
    await Books.insertMany([
      {
        title: 'Война и мир',
        authors: 'Л.Н.Толстой',
        description: 'Русская классика',
      },
      {
        title: 'Академия',
        authors: 'А.Азимов',
        description: 'Фантастика',
      },
    ]);
  } catch (err) {
    console.log('Error database initial insertion', err);
  }
}());

router.get('/', async (request, response) => {
  try {
    const books = await Books.find().select('-__v');

    response.render('../src/views/pages//index', { books });
  } catch (err) {
    response.status(500).json(err);
  }
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const book = await Books.findById(id).select('-__v');
    // console.log(book);
    await instance.post(`/counter/${id}/incr`);
    const counterResponse = await instance.get(`/counter/${id}`);

    response.render('../src/views/pages//view', { book, counter: counterResponse.data });
  } catch (err) {
    response.status(404).json(err);
  }
});

router.get('/update/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const book = await Books.findById(id).select('-__v');
    // console.log(book);

    response.render('../src/views/pages/update', { book });
  } catch (err) {
    response.status(404).json(err);
  }
});

router.post(
  '/',
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  async (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const {
        title, authors, description, favorite,
      } = request.body;
      // const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      const newBook = new Books({
        title, authors, description, favorite, fileCover, fileName,
      });

      try {
        await newBook.save();

        response.status(201);
        return response.redirect('/api/books');
      } catch (err) {
        response.status(500).json(err);
      }
    }
    return response.json('File not found');
  },
);

router.post(
  '/:id',
  upload.fields([{ name: 'book-file', maxCount: 1 }, { name: 'cover-file', maxCount: 1 }]),
  async (request, response) => {
    if (request.files['book-file'] && request.files['cover-file']) {
      const { id } = request.params;

      const {
        title, authors, description, favorite,
      } = request.body;
      // const fileBook = request.files['book-file'][0].filename;
      const fileCover = request.files['cover-file'][0].filename;
      const fileName = request.files['book-file'][0].originalname;

      const updateBook = {
        title, authors, description, favorite, fileCover, fileName,
      };

      try {
        await Books.findByIdAndUpdate(id, updateBook);

        response.status(200);
        return response.redirect('/api/books');
      } catch (err) {
        response.status(404).json(err);
      }
    }
    return response.json('File not found');
  },
);

router.get('/delete/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await Books.findByIdAndDelete(id);

    response.redirect('/api/books');
  } catch (err) {
    response.status(404).json(err);
  }
});

// router.get('/:id/download', (request, response) => {
//   const { id } = request.params;
//   const index = library.findIndex(item => item.id === id);

//   if (index === -1) {
//     response.status(404);
//     return response.json('404 Страница не найдена');
//   }

//   return response.download(`${__dirname}/../storage/${library[index].fileBook}`, err => {
//     if (err) {
//       response.status(404).json(err);
//     }
//   });
// });

module.exports = router;
