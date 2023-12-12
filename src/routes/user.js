const express = require('express');

const router = express.Router();

router.get('/login', (request, response) => {
  response.render('../src/views/pages//login');
});

router.get('/me', (request, response) => {
  response.render('../src/views/pages//user-profile');
});

module.exports = router;
