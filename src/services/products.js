var path = require('path');
var products = require(path.join(__dirname, '../../data/products.json'));

/*
Invoke the callback with an array of all products.
*/
exports.getProducts = function(callback) {	

    if (typeof callback === "function") {
    	callback(null, products);
    } else {
    	callback("Error: getProducts called without a valid function as a parameter.")
    }

};

/*
Invoke the callback with the product with the given ID.
If no product exists with the given productId then invoke
the callback with an error.

The given callback should have the following signature:
function(err, product)
*/
exports.getProductById = function(productId, callback) {

	var elementFound = null;

	for (var i = 0; i < products.length; i++) {
			if (products[i].id == productId) {
				elementFound = i;
				break;
			}
	}

	if (elementFound != null) {
		callback (null, products[elementFound]);
	} else {
		callback ("Error: productId not found");
	}

};

