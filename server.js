/* jshint devel:true */
	require('colors');
	var productsService = require('./src/services/products');

	var express = require('express');
//	var routes = require('./routes');

	var app = module.exports = express();

	var HTTP_PORT = 8080;

	app.get('/', function(req, res) {
		res.send('shopping-cart-exercise root');
	});

	app.get('/products', function(req, res) {

		var products = null;
		productsService.getProducts(function(err, products){this.products = products;});
		res.type('application/json');
		res.send(this.products);

	});

	app.get('/products/:productId', function(req, res) {

		var product = null;
		productsService.getProductById(req.params.productId, function(err, product){this.product = product;});
		res.type('application/json');
		res.send(this.product);

	});

	if (!module.parent) {

		app.listen(HTTP_PORT, function(err) {

    		if (err) {
        		throw err;
		    }

    		console.log(('HTTP server listening on port ' + HTTP_PORT).green);
		});

	}
