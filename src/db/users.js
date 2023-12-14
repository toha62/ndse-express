const Users = require('../models/usersSchema');

async function findById(id, cb) {
  console.log('Findining user by ID: ', id);
  try {
    const user = await Users.findById(id).select('-__v');
    console.log('user is found: ', user);
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
      console.log('user is found: ', user[0]);
      cb(null, user[0]);
    } else {
      console.log('user not found');
      cb(null, null);
    }
  } catch (err) {
    cb(err);
  }
}

const verifyPassword = (user, password) => user.password === password;

module.exports = { findById, findByUsername, verifyPassword };
