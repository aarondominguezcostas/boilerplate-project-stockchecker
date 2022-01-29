'use strict';

const { getStockPriceByName } = require('../services/apiPriceService');
const { getStockByName, addStock } = require('../services/stockService');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){

      var companies = req.query.stock;
      let requestInfo = [];

      //check if there are multiple values requested
      if(!Array.isArray(companies)){
        companies = [companies];
      }

      //get the stock info for each company
      for(let i = 0; i < companies.length; i++){
        let companyInfo = await getStockPriceByName(companies[i]);
        requestInfo.push(companyInfo);
      }

      if(requestInfo.length === 1){
        //get likes
        let stock = await getStockByName(requestInfo[0].stock);
        if(stock === null){
          requestInfo[0].likes = 0;
        }else{
          requestInfo[0].likes = stock.likes.length;
        }

        // fill in the response
        let jsonResponse = {
          stockData: requestInfo[0]
        }

        res.json(jsonResponse);
      }else{

        //get likes for each company
        let likes = [];

        for(let i = 0; i < requestInfo.length; i++){
          let stock = await getStockByName(requestInfo[i].stock);
          if(stock === null){
            likes.push(0);
          }else{
            likes.push(stock.likes.length);
          }
        }

        requestInfo[0].rel_likes = likes[0] - likes[1];
        requestInfo[1].rel_likes = likes[1] - likes[0];

        //fill in the response
        let jsonResponse = {
          stockData: requestInfo
        }

        res.json(jsonResponse);
        
      }

      return;

  });
    
};
