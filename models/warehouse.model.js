const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  price: {
    type: Number,
  },
  promotionDiscountPercent: {
    type: Number,
  },
  promotionDiscountBath: {
    type: Number,
  },
});

warehouseSchema.statics = {
};

module.exports = mongoose.model('Warehouse', warehouseSchema);
