const { Router } = require('express');

const authRoutes = require('./authRoutes');

const router = Router();

router.get('/health', (request, response) => {
  return response.json({ status: 'ok', app: 'Hippiex Store API' });
});

router.use('/auth', authRoutes);

module.exports = router;
