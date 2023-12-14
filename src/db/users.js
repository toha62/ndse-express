const Users = require('../models/usersSchema');

async function findById(id, cb) {
  try {
    const user = await Users.findById(id).select('-__v');

    cb(null, user);
  } catch (err) {
    cb(err);
  }
}

async function findByUsername(username, cb) {
  console.log('Findining user by username: ', username);
  try {
    const user = await Users.find({ username }).select('-__v');

    if (user) {
      cb(null, user[0]);
    } else {
      cb(null, null);
    }
  } catch (err) {
    cb(err);
  }
}

const verifyPassword = (user, password) => user.password === password;

module.exports = { findById, findByUsername, verifyPassword };
