const { v4: uuid } = require('uuid');

class Book {
  constructor(title, authors, description = '', favorite = '', fileCover = '', fileName = '') {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.id = uuid();
  }
}

module.exports = Book;
