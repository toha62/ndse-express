const { v4: uuid } = require('uuid');

class Book {
  constructor(title, authors, description = '', favorite = '', fileCover = '', fileName = '', fileBook = '') {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = uuid();
  }
}

module.exports = Book;
