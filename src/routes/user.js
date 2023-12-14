const express = require('express');
const passport = require('passport');

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
    console.log('req.user: ', request.user);
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

module.exports = router;
