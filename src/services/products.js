var path = require('path');
var products = require(path.join(__dirname, '../../data/products.json'));

/*
Invoke the callback with an array of all products.
*/
exports.getProducts = function(callback) {
    // TODO: Implement
};

/*
Invoke the callback with the product with the given ID.
If no product exists with the given productId then invoke
the callback with an error.

The given callback should have the following signature:
function(err, product)
*/
exports.getProductById = function(productId, callback) {
    // TODO: Implement
};