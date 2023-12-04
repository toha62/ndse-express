const { Schema, model } = require('mongoose');

const booksSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  authors: {
    type: String,
  },
  favorite: {
    type: String,
    default: '',
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
});

module.exports = model('books', booksSchema);
