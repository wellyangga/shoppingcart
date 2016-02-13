var express = require('express');

var routes = function(Cart, Product, Coupon){
	var cartRouter = express.Router();

	// cart
	cartRouter.route('/')
		.get(function(req, res){
			Cart.getCarts(function(err, cart){
			if(err){
					throw err;
				}
				res.json(cart);
			});
		})
		.post(function(req,res){
			var cart = req.body;
			Cart.addCart(cart, function(err, cart){
				if(err){
					throw err;
				}
				res.status(201).json(cart);
			});
		});

	cartRouter.route('/:_cartid')
		.get(function(req, res){
			Cart.getCartById(req.params._cartid, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart);
			});
		})
		.put(function(req, res){
			var id = req.params._cartid;
			var cart = req.body;
			Cart.updateCart(id, cart, {}, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart);
			});
		})
		.delete(function(req, res){
			var id = req.params._cartid;
			Coupon.removeCart(id, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart);
			});
		});

	// items
	cartRouter.route('/:_cartid/items')
		.get(function(req, res){
			var responseJson = { title : "show items in cart" };

			res.json(responseJson);
		})
		.post(function(req,res){
			var responseJson = { title : "add item to cart" };

			res.status(201).json(responseJson)
		});


	cartRouter.route('/:_cartid/items/:_productid')
		.delete(function(req, res){
			var responseJson = { title : "remove product from cart" };

			res.json(responseJson);
		});

	// coupons
	cartRouter.route('/:_cartid/coupons')
		.post(function(req,res){
			var responseJson = { title : "use coupon in cart" };

			res.status(201).json(responseJson)
		});

	cartRouter.route('/:_cartid/coupons/:_couponid')
		.delete(function(req,res){
			var responseJson = { title : "remove coupon from cart" };

			res.status(200).json(responseJson)
		})

	return cartRouter;
};

module.exports = routes;