const { Router } = require('express');

const productsController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/', productsController.list);
productsRoutes.get('/:id', productsController.show);

module.exports = productsRoutes;
