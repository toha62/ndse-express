const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  userName: String,
  password: String,
  displayName: String,
  email: String,
});

module.exports = model('users', usersSchema);
