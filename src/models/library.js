const { Schema, model } = require('mongoose');

const librarySchema = new Schema({
  id: {
    type: String,
  },
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
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  },
});

module.exports = model('Library', librarySchema);
