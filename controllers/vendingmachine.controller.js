/* eslint-disable prefer-const */
const VendingMachineModel = require('../models/vendingmachine.model');

exports.test = async (req, res, next) => {
  try {
    res.json('test');
  } catch (error) {
    next(error);
  }
};

exports.createDrink = async (req, res, next) => {
  try {
    const { body } = req;
    const dataDrink = {
      drink: body.drink,
      price: body.price,
    };
    const resp = await new VendingMachineModel(dataDrink).save();
    res.json({ success: true, data: resp });
  } catch (error) {
    next(error);
  }
};

exports.calculateChange = async (req, res, next) => {
  try {
    const { body } = req;
    const findDrink = await VendingMachineModel.findOne({ drink: body.drink });
    if (!findDrink) {
      res.json({ success: false, message: 'Data not found.' });
      return null;
    }
    const calculateChange = body.inputMoney - findDrink.price;
    if (calculateChange < 0) {
      const convertToPositive = Math.abs(calculateChange);
      res.json({ success: true, message: `ขาดอีก ${convertToPositive}` });
      return null;
    }

    let amountFiftyBankNote = 0;
    let amountTwentyBankNote = 0;
    let amountTenCoin = 0;
    let amountFiveCoin = 0;
    let amountOneCoin = 0;
    amountFiftyBankNote = parseInt(calculateChange / 50, 10);
    const modFifty = calculateChange % 50;
    if (modFifty > 0) {
      amountTwentyBankNote = parseInt(modFifty / 20, 10);
      const modTwenty = modFifty % 20;
      if (modTwenty > 0) {
        amountTenCoin = parseInt(modTwenty / 10, 10);
        const modTen = modTwenty % 10;
        if (modTen > 0) {
          amountFiveCoin = parseInt(modTen / 5, 10);
          const modFive = modTen % 5;
          if (modFive > 0) {
            amountOneCoin = modFive;
          }
        }
      }
    }
    res.json({
      success: true,
      changeMoney: calculateChange,
      amountFiftyBankNote,
      amountTwentyBankNote,
      amountTenCoin,
      amountFiveCoin,
      amountOneCoin,
    });
  } catch (error) {
    next(error);
  }
};
