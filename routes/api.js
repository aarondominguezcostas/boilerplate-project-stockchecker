'use strict';

const axios = require('axios');

// stock api ; GET https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){


      var companies = req.query.stock;

      if(!Array.isArray(companies)){
        companies = [companies];
      }

      for(let company in companies){
        axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${companies[company]}/quote`)
          .then(function (response) {
            // handle success
            console.log(response.data);
          }).catch(function (err) {
            // handle error
            console.log(err);
          });
      }

    });
    
};
