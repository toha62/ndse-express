const express = require('express');
const passport = require('passport');
const Users = require('../models/usersSchema');

const router = express.Router();

router.get('/login', (request, response) => {
  response.render('../src/views/pages//login');
});

router.get(
  '/me',
  (request, response, next) => {
    if (!request.isAuthenticated()) {
      return response.redirect('/login');
    }
    return next();
  },
  (request, response) => {
    response.render('../src/views/pages//user-profile', { user: request.user });
  },
);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  (request, response) => {
    response.redirect('/');
  },
);

router.get(
  '/logout',
  (request, response, next) => {
    console.log('logout');
    request.logout(err => {
      if (err) {
        return next(err);
      }
      return response.redirect('/');
    });
  },
);

router.post(
  '/signup',
  async (request, response) => {
    console.log('signUp ', request.body);
    const {
      username, userpassword, dispname, email,
    } = request.body;
    const newUser = new Users({
      username, password: userpassword, displayName: dispname, email,
    });

    try {
      await newUser.save();

      response.status(201);
      return response.redirect('login');
    } catch (err) {
      console.log('Error database initial insertion Users', err);
      return response.status(500);
    }
  },
);

module.exports = router;
