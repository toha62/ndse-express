const express = require('express');

const router = express.Router();

router.get('/login', (request, response) => {
  response.render('../src/views/pages//login');
});

router.get('/me', (request, response) => {
  response.status(201);
  response.json({
    id: 1,
    profile: 'me',
  });
});

module.exports = router;
