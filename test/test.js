/* jshint expr:true */

var chai = require('chai');
var expect = chai.expect;
var async = require('async');
var productsService = require('../src/services/products');
var couponsService = require('../src/services/coupons');
var shoppingCartService = require('../src/services/shopping-cart');

describe('products service', function(done) {
	this.timeout(1000);

	it('should allow fetching all products', function(done) {
        productsService.getProducts(function(err, products) {
            expect(err).to.not.exist;
            expect(products.length).to.equal(5);
            done();
        });
    });

    it('should allow fetching product by id', function(done) {
        productsService.getProductById('1', function(err, product) {
            expect(err).to.not.exist;
            expect(product).to.exist;
            expect(product.id).to.equal('1');
            expect(product.name).to.equal('Desk Lamp');
            done();
        });
    });

    it('should return error when fetching invalid product ID', function(done) {
        productsService.getProductById('XYZ', function(err, product) {
            expect(err).to.exist;
			expect(product).to.not.exist;
            done();
        });
    });
});

describe('coupons service', function(done) {
	this.timeout(1000);

	it('should allow fetching all coupons', function(done) {
        couponsService.getCoupons(function(err, coupons) {
            expect(err).to.not.exist;
            expect(coupons.length).to.equal(2);
            done();
        });
    });

    it('should allow fetching coupon by id', function(done) {
        couponsService.getCouponById('SAVE50', function(err, coupon) {
            expect(err).to.not.exist;
            expect(coupon).to.exist;
            expect(coupon.id).to.equal('SAVE50');
            expect(coupon.discount).to.equal(0.5);
            done();
        });
    });

    it('should return error when fetching invalid coupon ID', function(done) {
        couponsService.getCouponById('XYZ', function(err, coupon) {
            expect(err).to.exist;
			expect(coupon).to.not.exist;
            done();
        });
    });
});

describe('shopping cart service', function(done) {
	this.timeout(1000);

	it('should allow items to be added', function(done) {
        var shoppingCart = shoppingCartService.createShoppingCart();

		async.waterfall([
			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.addItem('1', 5, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(5);
				callback();
			},

			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.addItem('1', 5, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(10);
				done();
			},
		], done);
    });

	it('should prevent invalid products from being added', function(done) {
        var shoppingCart = shoppingCartService.createShoppingCart();
		shoppingCart.addItem('XYZ', 5, function(err) {
			expect(err).to.exist;
			done();
		});
    });

	it('should prevent invalid quantities being updated for invalid products', function(done) {
        var shoppingCart = shoppingCartService.createShoppingCart();
		shoppingCart.updateItemQuantity('XYZ', 1, function(err) {
			expect(err).to.exist;
			done();
		});
    });

    it('should allow quantities to be updated', function(done) {
		var shoppingCart = shoppingCartService.createShoppingCart();

		async.waterfall([
			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.updateItemQuantity('1', 5, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(5);
				callback();
			},

			function(callback) {
				// Set quantity of Desk Lamps to be 1
		        shoppingCart.updateItemQuantity('1', 1, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(1);
				done();
			},
		], done);
    });

    it('should allow items to be removed', function(done) {
		var shoppingCart = shoppingCartService.createShoppingCart();

		async.waterfall([
			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.updateItemQuantity('1', 5, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(5);
				callback();
			},

			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.removeItem('1', callback);
			},

			function(callback) {
		        shoppingCart.getItemByProductId('1', callback);
			},

			function(item, callback) {
				expect(item).to.not.exist;
				callback();
			}
		], done);
    });

    it('should hold multiple products', function(done) {
		var shoppingCart = shoppingCartService.createShoppingCart();

		async.waterfall([
			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.updateItemQuantity('1', 5, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(5);
				callback();
			},

			function(callback) {
				// Add 10 Office Chairs
		        shoppingCart.updateItemQuantity('2', 10, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Office Chair');
		        expect(item.quantity).to.equal(10);
				callback();
			},

			function(callback) {
				shoppingCart.getItemByProductId('1', callback);
			},

			function(item, callback) {
		        expect(item.quantity).to.equal(5);
				callback();
			},

			function(callback) {
		        shoppingCart.getItemByProductId('2', callback);
			},

			function(item, callback) {
		        expect(item.quantity).to.equal(10);
				callback();
			}
		], done);
    });

    it('should calculate total', function(done) {
        var shoppingCart = shoppingCartService.createShoppingCart();
        var expectedTotal = 0;
		productsService.getProducts(function(err, products) {

			var work = [];

			products.forEach(function(product) {
				work.push(function(callback) {
					expectedTotal += (product.price * 2);
					shoppingCart.addItem(product.id, 2, callback);
				});
	        });

			async.parallel(work, function(err) {
				expect(err).to.not.exist;
				expect(shoppingCart.getTotal()).to.equal(expectedTotal);
				done();
			});
		});
    });

	it('should handle discount coupons', function(done) {
		var shoppingCart = shoppingCartService.createShoppingCart();

		var subtotal = 0;

		async.waterfall([
			function(callback) {
				// Add 5 Desk Lamps
		        shoppingCart.updateItemQuantity('1', 1, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Desk Lamp');
		        expect(item.quantity).to.equal(1);

				subtotal += item.product.price * item.quantity;

				callback();
			},

			function(callback) {
				// Add 10 Office Chairs
		        shoppingCart.updateItemQuantity('2', 1, callback);
			},

			function(item, callback) {
		        expect(item).to.exist;
		        expect(item.product).to.exist;
		        expect(item.product.name).to.equal('Office Chair');
		        expect(item.quantity).to.equal(1);

				subtotal += item.product.price * item.quantity;

				callback();
			},

			function(callback) {
				shoppingCart.applyCoupon('SAVE15', callback);
			},

			function(coupon, callback) {
				expect(coupon).to.exist;
				expect(coupon.id).to.equal('SAVE15');
				done();
			},

			function(callback) {
				shoppingCart.applyCoupon('SAVE50', callback);
			},

			function(coupon, callback) {
				expect(coupon).to.exist;
				expect(coupon.id).to.equal('SAVE50');
				done();
			},

			function(callback) {
		        expect(parseInt(shoppingCart.getTotal())).to.equal(parseInt(subtotal * 0.50));
			},

			function(item, callback) {
		        expect(item.quantity).to.equal(10);
				callback();
			}
		], done);
    });
});