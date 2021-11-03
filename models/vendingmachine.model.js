const mongoose = require('mongoose');

const vendingMachineSchema = new mongoose.Schema({
  drink: {
    type: String,
  },
  price: {
    type: Number,
  },
});

vendingMachineSchema.statics = {
};

module.exports = mongoose.model('VendingMachine', vendingMachineSchema);
