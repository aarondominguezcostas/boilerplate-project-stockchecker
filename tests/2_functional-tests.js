const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// TESTS: 
/*
Viewing one stock: GET request to /api/stock-prices/
Viewing one stock and liking it: GET request to /api/stock-prices/
Viewing the same stock and liking it again: GET request to /api/stock-prices/
Viewing two stocks: GET request to /api/stock-prices/
Viewing two stocks and liking them: GET request to /api/stock-prices/
*/

suite('Functional Tests', function() {
    suite('5 functional requests tests', function() {
        test('GET request to /api/stock-prices', function(done) {
            chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: 'GOOG'})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'GOOG');
                assert.exists(res.body.stockData.price, 'Precio');
                done();
            });
        });
        test('View one stock and liking it', function(){
            chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: 'GOOG', like: 'true'})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'GOOG');
                assert.exists(res.body.stockData.price, 'Precio');
                assert.equal(res.body.stockData.likes, 1);
            });
        });
        test('View one stock and liking it again', function(){
            chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: 'GOOG', like: 'true'})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData.stock, 'GOOG');
                assert.exists(res.body.stockData.price, 'Precio');
                assert.equal(res.body.stockData.likes, 1);
            });
        });
        test('View two stocks', function(){
            chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: ['GOOG', 'MSFT']})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, 'GOOG');
                assert.exists(res.body.stockData[0].price, 'Precio');
                assert.equal(res.body.stockData[1].stock, 'MSFT');
                assert.exists(res.body.stockData[1].price, 'Precio');
            });
        });
        test('View two stocks and liking them', function(){
            chai
            .request(server)
            .get('/api/stock-prices')
            .set('content-type', 'application/json')
            .query({stock: ['GOOG', 'MSFT'], like: 'true'})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.stockData[0].stock, 'GOOG');
                assert.exists(res.body.stockData[0].price, 'Precio');
                assert.equal(res.body.stockData[0].rel_likes, 0);
                assert.equal(res.body.stockData[1].stock, 'MSFT');
                assert.exists(res.body.stockData[1].price, 'Precio');
                assert.equal(res.body.stockData[1].rel_likes, 0);
            });
        });
    });
});
