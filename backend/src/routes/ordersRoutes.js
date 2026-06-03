const { Router } = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoutes = Router();

ordersRoutes.post('/', ordersController.create);

module.exports = ordersRoutes;
