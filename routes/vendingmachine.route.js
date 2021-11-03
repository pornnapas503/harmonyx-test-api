const express = require('express');
const controller = require('../controllers/vendingmachine.controller');

const router = express.Router();
router.route('/test').get(controller.test);
router.route('/createDrink').post(controller.createDrink);
router.route('/calculateChange').post(controller.calculateChange);

module.exports = router;
