var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	productId : String
});

var cartSchema = mongoose.Schema({
	code:{
		type: Number,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	items: [itemSchema],
	couponId:String
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

module.exports.addItemsToChart =  function(id, itemIds, options, callback){
	var query = {_id : id };
	var update = {
		items: []
	};
	for(var index in itemIds){
		update.items.push({ productId : itemIds[index].id });
	}

	Cart.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeItemsFromChart =  function(id, removedItemId, options, callback){
	var query = {_id : id };
	var cartObj = {};

	Cart.findById(id, function(err,cart){
		
		if (cart){
			cartObj = cart;

			var update = {
				items: []
			};

			for(var index in cartObj.items){
				if (cartObj.items[index].productId != removedItemId){
					update.items.push(
						{ 
							_id : cartObj.items[index]._id,
							productId : cartObj.items[index].productId 
						});
				}
			}

			Cart.findOneAndUpdate(query, update, options, callback);
		}
		
	}); 
}

module.exports.useCoupon = function(id, couponId, options, callback){
	var query = {_id : id };
	var update = {
		couponId : couponId
	}
	Cart.findOneAndUpdate(query, update, options, callback);
}

module.exports.getTotal = function(id, callback){
	Cart.findById(id, function(err, cart){
		if (err){
			throw err;
		}

		
	});
}


