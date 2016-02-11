var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
	code:{
		type: Number,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	items:[],
	_couponId:String
});

var Cart = module.exports = mongoose.model('Cart', cartSchema);

module.exports.getCarts = function(callback, limit){
	Cart.find(callback).limit(limit);
}

module.exports.getCartById = function(id, callback){
	Cart.findById(id, callback);
}

module.exports.addCart = function(cart, callback){
	Cart.create(cart, callback);
}

module.exports.updateCart = function(id, cart, options, callback){
	var query = {_id : id };
	var update = {
		description: cart.description
	};
	Cart.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeCart = function(id, callback){
	var query = { _id:id };
	Cart.remove(query, callback);
}