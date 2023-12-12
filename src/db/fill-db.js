const Books = require('../models/booksSchema');
const Users = require('../models/usersSchema');

// начальное заполнение БД для тестирования
async function fillDB() {
  try {
    await Users.insertMany([
      {
        userName: 'Иван Петров',
        password: '123',
        displayName: 'Ivan',
        email: 'ivan@mail.com',
      },
      {
        userName: 'Джон Уик',
        password: '111',
        displayName: 'John',
        email: 'john@mail.com',
      },
    ]);
  } catch (err) {
    console.log('Error database initial insertion Users', err);
  }
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
    console.log('Error database initial insertion Books', err);
  }
}

module.exports = fillDB;
