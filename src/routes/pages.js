const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('../src/views/pages/main', { user: request.user });
});

router.get('/create', (request, response) => {
  response.render('../src/views/pages/create');
});

router.get('/update', (request, response) => {
  response.render('../src/views/pages/update');
});

router.get('/registration', (request, response) => {
  response.render('../src/views/pages/registration');
});

module.exports = router;
