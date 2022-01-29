
const axios = require('axios');

// stock api ; GET https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote

async function getStockPriceByName(name){
    var response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${name}/quote`);
            // handle success
    let companyInfo = {
      stock: name,
      price: response.data.latestPrice,
    };
    
    console.log(companyInfo);
  
    return companyInfo;
  }

module.exports = {
    getStockPriceByName
};