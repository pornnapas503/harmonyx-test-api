const express = require('express');
const vendingMachineRoutes = require('./vendingmachine.route');
const warehouseRoutes = require('./warehouse.route');

const router = express();

router.use('/vendingmachines', vendingMachineRoutes);
router.use('/warehouses', warehouseRoutes);

module.exports = router;
