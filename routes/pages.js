const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('pages/main');
});

router.get('/create', (request, response) => {
  response.render('pages/create');
});

router.get('/update', (request, response) => {
  response.render('pages/update');
});

module.exports = router;
