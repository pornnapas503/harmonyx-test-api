const WarehouseModel = require('../models/warehouse.model');

async function calculateDecimalToSmallChange(data) {
  let resp;
  if (data === 0) {
    resp = 0;
  } else if (data > 0 && data <= 0.25) {
    resp = 0.25;
  } else if (data > 0.25 && data <= 0.50) {
    resp = 0.50;
  } else if (data > 0.50 && data <= 0.75) {
    resp = 0.75;
  }
  return resp;
}

exports.createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const data = {
      sku: body.sku,
      price: body.price,
      promotionDiscountPercent: !body.promotionDiscountPercent ? 0 : body.promotionDiscountPercent,
    };
    const resp = await new WarehouseModel(data).save();
    res.json({ success: true, data: resp });
  } catch (error) {
    next(error);
  }
};

exports.calculateTotalPrice = async (req, res, next) => {
  try {
    const { list } = req.body;
    let totalPrice = 0;
    let discount = 0;
    const product = await WarehouseModel.find({});
    list.forEach((item) => {
      const findProduct = product.find((itemProduct) => item.sku === itemProduct.sku);
      totalPrice += item.amount * findProduct.price;
      if (findProduct.promotionDiscountBath !== 0) {
        discount += item.amount * findProduct.promotionDiscountBath;
      } else if (findProduct.promotionDiscountBath === 0
          && findProduct.promotionDiscountPercent > 0) {
        discount += item.amount * findProduct.price * (findProduct.promotionDiscountPercent / 100);
      }
    });
    const decimalTotalPrice = totalPrice - Math.floor(totalPrice);
    const decimalTotalDiscount = discount - Math.floor(discount);

    if (decimalTotalPrice > 0.75) {
      totalPrice = totalPrice + 1 - decimalTotalPrice;
    } else {
      const calSmallChangeTotalPrice = await calculateDecimalToSmallChange(decimalTotalPrice);
      totalPrice = totalPrice + calSmallChangeTotalPrice - decimalTotalPrice;
    }

    if (decimalTotalDiscount > 0.75) {
      discount = discount + 1 - decimalTotalDiscount;
    } else {
      const calSmallChangeDiscount = await calculateDecimalToSmallChange(decimalTotalDiscount);
      discount = discount + calSmallChangeDiscount - decimalTotalDiscount;
    }

    const convertTotalPriceTwoDecimal = totalPrice.toFixed(2);
    const convertDiscountTwoDecimal = discount.toFixed(2);
    const total = (totalPrice - discount).toFixed(2);

    res.json({
      success: true,
      totalPrice: convertTotalPriceTwoDecimal,
      discount: convertDiscountTwoDecimal,
      total,
    });
  } catch (error) {
    next(error);
  }
};
