const express = require('express');
const controller = require('../controllers/warehouse.controller');

const router = express.Router();
router.route('/createProduct').post(controller.createProduct);
router.route('/calculateTotalPrice').post(controller.calculateTotalPrice);

module.exports = router;
