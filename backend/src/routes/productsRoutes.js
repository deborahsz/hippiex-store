const { Router } = require('express');

const productsController = require('../controllers/productsController');
const asyncHandler = require('../lib/asyncHandler');

const productsRoutes = Router();

productsRoutes.get('/', asyncHandler(productsController.list));
productsRoutes.get('/:id', asyncHandler(productsController.show));

module.exports = productsRoutes;
