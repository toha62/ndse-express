const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('pages/main');
});

router.get('/create', (request, response) => {
  response.render('pages/create');
});

module.exports = router;
