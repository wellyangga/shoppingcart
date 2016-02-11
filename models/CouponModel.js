var mongoose = require('mongoose');

var couponSchema = mongoose.Schema({
	code:{
		type: String,
		required: true
	},
	type:String,
	value:{
		type: Number,
		required: true
	},
	isUsed: Boolean,
	startDate: Date,
	expiryDate: Date
});

var Coupon = module.exports = mongoose.model('Coupon', couponSchema);

module.exports.getCoupon = function(callback, limit){
	Coupon.find(callback).limit(limit);
}

module.exports.getCouponById = function(id, callback){
	Coupon.findById(id, callback);
}

module.exports.addCoupon = function(coupon, callback){
	Coupon.create(coupon, callback);
}

module.exports.updateCoupon = function(id, coupon, options, callback){
	var query = {_id : id };
	var update = {
		value: coupon.value
	};
	Coupon.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeCoupon = function(id, callback){
	var query = { _id:id };
	Coupon.remove(query, callback);
}