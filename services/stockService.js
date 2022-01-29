const { model } = require('mongoose');
const Stock = require('../models/Stock');

// Returns every piece of Asset
async function getStockByName(titleToSearch) {
    const stock = await Stock.findOne({name: titleToSearch}).exec();

    if (!stock) {
        return null;
    }

    return stock;
}

async function addStock(stock) {
    const newStock = new Stock(stock);
    await newStock.save();
}

async function findAndUpdateStock(stockName, ip) {
    const stock = await getStockByName(stockName);

    if (!stock) {
        let newStock = new Stock({
            name: stockName,
            likes: [ip]
        });
        await newStock.save();
    }else{
        if(stock.likes.indexOf(ip) === -1){        
            stock.likes.push(ip);
            await stock.save();
        }
    }

}

module.exports = {
    getStockByName,
    addStock,
    findAndUpdateStock
};