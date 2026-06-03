const { Router } = require('express');

const authRoutes = require('./authRoutes');
const productsRoutes = require('./productsRoutes');

const router = Router();

router.get('/health', (request, response) => {
  return response.json({ status: 'ok', app: 'Hippiex Store API' });
});

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);

module.exports = router;
