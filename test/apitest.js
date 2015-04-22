/* jshint expr:true */

var chai = require('chai');
var expect = chai.expect;
var async = require('async');
var app = require('../../shopping-cart-exercise/server.js');
var port = 8080;
var http = require('http');
var server = null;

describe('RESTful API', function(done) {

	before (function(done) {
		this.server = app.listen(port, function (err, result) {
			if (err) {
				done(err);
			} else {
				done();
			}
		})
	});

	after (function (done) {
		this.server.close();
		done();
	});

	it ('should exist', function(done) {
		expect(app).to.exist;
		done();
	});

	it ('should be listening on localhost:8080', function(done) {
		http.get("http://localhost:8080/badpath", function (res) {
			expect(res.statusCode).to.equal(404);
			done();
		});
	});

	it ('should respond to root path', function(done) {
		http.get("http://localhost:8080/", function (res) {

			expect(res.statusCode).to.equal(200);

			res.on('data', function(chunk) {

				dataReturned = new Buffer(chunk).toString('ascii');
				expect(dataReturned).to.equal('shopping-cart-exercise root');

				done();

			});

		});

    });


	it('should allow fetching all products', function(done) {
		http.get("http://localhost:8080/products", function (res) {

			expect(res.statusCode).to.equal(200);

			res.on('data', function(chunk) {

				dataReturned = JSON.parse(new Buffer(chunk).toString('ascii'));
				expect(dataReturned.length).to.equal(5);
				expect(dataReturned[3].id).to.equal('4');
				expect(dataReturned[3].name).to.equal('Laptop');

				done();

			});

		});

    });

	it('should allow fetching a single product', function(done) {
		http.get("http://localhost:8080/products/3", function (res) {

			expect(res.statusCode).to.equal(200);

			res.on('data', function(chunk) {

				dataReturned = JSON.parse(new Buffer(chunk).toString('ascii'));
				expect(dataReturned.id).to.equal('3');
				expect(dataReturned.name).to.equal('Printer');
				expect(dataReturned.description).to.equal('Fast laser printer');
				expect(dataReturned.price).to.equal(120);

				done();

			});

		});
    });
});
