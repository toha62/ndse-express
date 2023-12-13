const Users = require('../models/usersSchema');

exports.findById = async function (id, cb) {
  try {
    const user = await Users.findById(id).select('-__v');

    cb(null, user);
  } catch (err) {
    cb(err);
  }
};

exports.findByUsername = async function (username, cb) {
  try {
    const user = await Users.find({ username }).select('-__v');

    if (user) {
      cb(null, user);
    } else {
      cb(null, null);
    }
  } catch (err) {
    cb(err);
  }
};

exports.verifyPassword = (user, password) => user.password === password;
