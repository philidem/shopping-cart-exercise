var assert = require('assert');
var productsService = require('./products');
var couponsService = require('./coupons');

function ShoppingCartItem(product) {
    assert(product != null);
    assert(typeof product === 'object');
    assert(product.id != null);

    this.product = product;
    this.quantity = 0;
}

ShoppingCartItem.prototype = {
    getProduct: function() {
        return this.product;
    },

    getQuantity: function() {
        return this.quantity;
    }
};

function ShoppingCart() {
    // array of items
    this.items = [];

    // array of coupons
    this.coupons = [];
}

ShoppingCart.prototype = {
    /*
    Invoke the callback with the array of ShoppingCartItem objects

    The given callback should have the following signature:
    function(err, items)
    */
    getItems: function(callback) {
        // TODO: Implement
    },

    /*
    Invoke the callback with the ShoppingCartItem associated with the
    given productId. If no item exists for the given productId then
    invoke the callback with null to indicate not found.

    The given callback should have the following signature:
    function(err, item)
    */
    getItemByProductId: function(productId, callback) {
        // TODO: Implement
    },

    /*
    If an item associated with the given productId exists then increment its quantity
    by the given quantity.
    If no item exists for the given productId then add a new item with the
    given productId and quanity.

    Upon success, invoke the given callback with ShoppingCartItem.
    If productId is not valid then invoke callback with error as first argument.

    The given callback should have the following signature:
    function(err, item)
    */
    addItem: function(productId, quantity, callback) {
        // TODO: Implement
    },

    /*
    If an item associated with the given productId exists then set its quantity
    to the given quantity.
    If no item exists for the given productId then add a new item with the
    given productId and quanity.

    Upon success, invoke the given callback with ShoppingCartItem.
    If productId is not valid then invoke callback with error as first argument.

    The given callback should have the following signature:
    function(err, item)
    */
    updateItemQuantity: function(productId, quantity, callback) {
        // TODO: Implement
    },

    /*
    Remove item with given productId. If no item exists for the given
    productId then simply invoke callback with no error.

    The given callback should have the following signature:
    function(err)
    */
    removeItem: function(productId, callback) {
        // TODO: Implement
    },

    /*
    Calculate the total. The total should be the sum of each line item
    less any discounts that were applied via coupons.
    NOTE: Only "discount" type coupons need to be handled.
    */
    getTotal: function() {
        // TODO: Implement
    },

    /*
    Only one instance of each coupon *type* of coupon can be applied.
    For example, you can't apply both SAVE15 and SAVE50 because they
    are both "discount" coupons.

    If the coupon with given couponId is successfully applied then invoke
    the callback with the coupon associated with given couponId.

    If there is already a coupon of the given type then replace the old coupon with the new coupon.
    If the given couponId has not been applied then add coupon to list of coupons.

    The given callback should have the following signature:
    function(err, coupon)
    */
    applyCoupon: function(couponId, callback) {
        // TODO: Implement
    },

    /*
    Invoke callback with array of coupons.

    The given callback should have the following signature:
    function(err, coupons)
    */
    getCoupons: function(callback) {
        // TODO: Implement
    }
};


exports.createShoppingCart = function() {
    return new ShoppingCart();
};