const { model } = require('mongoose');
const Stock = require('../models/Stock');

// Returns every piece of Asset
async function getStockByName(titleToSearch) {
    const stock = await Stock.findOne({title: titleToSearch}).exec();

    if (!stock) {
        return null;
    }

    return stock;
}

async function addStock(stock) {
    const newStock = new Stock(stock);
    await newStock.save();
}

module.exports = {
    getStockByName,
    addStock
};