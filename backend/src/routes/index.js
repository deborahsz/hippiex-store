const { Router } = require('express');

const router = Router();

router.get('/health', (request, response) => {
  return response.json({ status: 'ok', app: 'Hippiex Store API' });
});

module.exports = router;
