const { Router } = require('express');

const ordersController = require('../controllers/ordersController');
const asyncHandler = require('../lib/asyncHandler');
const { authenticate } = require('../middlewares/auth');

const ordersRoutes = Router();

ordersRoutes.use(authenticate);

ordersRoutes.post('/', asyncHandler(ordersController.create));
ordersRoutes.get('/', asyncHandler(ordersController.listMine));

module.exports = ordersRoutes;
