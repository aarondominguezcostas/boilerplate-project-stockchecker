'use strict';

const { getStockPriceByName } = require('../services/apiPriceService');
const { getStockByName, addStock, findAndUpdateStock } = require('../services/stockService');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res){

      var companies = req.query.stock;
      var like = req.query.like;
      let requestInfo = [];
      let ip = req.socket.remoteAddress;

      //check if there are multiple values requested
      if(!Array.isArray(companies)){
        companies = [companies];
      }

      //get the stock info for each company
      for(let i = 0; i < companies.length; i++){
        companies[i] = companies[i].toUpperCase();
        let companyInfo = await getStockPriceByName(companies[i]);
        requestInfo.push(companyInfo);
      }

      if(requestInfo.length === 1){

        if(like == "true"){
          await findAndUpdateStock(requestInfo[0].stock, ip);
        }

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

          //actualizamos la base de datos si se quiere dar like
          if(like == "true"){
            await findAndUpdateStock(requestInfo[i].stock, ip);
          }

          let stock = await getStockByName(requestInfo[i].stock);

          if(stock === null){
            //no esta guardado en la base de datos
            likes.push(0);

          }else{
            //ya esta guardado en la base de datos
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
