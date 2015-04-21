var path = require('path');
var coupons = require(path.join(__dirname, '../../data/coupons.json'));

/*
Invoke the callback with an array of all coupons.
*/
exports.getCoupons = function(callback) {

    if (typeof callback === "function") {
    	callback(null, coupons);
    } else {
    	callback("Error: getCoupons called without a valid function as a parameter.")
    }

};

/*
Invoke the callback with the coupon with the given ID.
If no coupon exists with the given couponId then invoke
the callback with an error.

The given callback should have the following signature:
function(err, coupon)
*/
exports.getCouponById = function(couponId, callback) {

	var elementFound = null;

	for (var i = 0; i < coupons.length; i++) {
			if (coupons[i].id == couponId) {
				elementFound = i;
				break;
			}
	}

	if (elementFound != null) {
		callback (null, coupons[elementFound]);
	} else {
		callback ("Error: couponId not found");
	}

};