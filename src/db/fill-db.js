const Books = require('../models/booksSchema');
const Users = require('../models/usersSchema');

// начальное заполнение БД для тестирования
async function fillDB() {
  try {
    await Users.insertMany([
      {
        username: 'Ivan',
        password: '123',
        displayName: 'Иван Петров',
        email: 'ivan@mail.com',
      },
      {
        username: 'John',
        password: '111',
        displayName: 'Джон Уик',
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

  const test = await Users.find();
  console.log(test);
}

module.exports = fillDB;
