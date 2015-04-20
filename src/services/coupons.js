var path = require('path');
var coupons = require(path.join(__dirname, '../../data/coupons.json'));

/*
Invoke the callback with an array of all coupons.
*/
exports.getCoupons = function(callback) {
    // TODO: Implement
};

/*
Invoke the callback with the coupon with the given ID.
If no coupon exists with the given couponId then invoke
the callback with an error.

The given callback should have the following signature:
function(err, coupon)
*/
exports.getCouponById = function(couponId, callback) {
    // TODO: Implement
};