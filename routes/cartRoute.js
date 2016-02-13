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
			Cart.removeCart(id, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart);
			});
		});

	// items
	cartRouter.route('/:_cartid/items')
		.get(function(req, res){
			Cart.getCartById(req.params._cartid, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart.items);
			});
		})
		.post(function(req,res){
			var productIds = req.body.productIds;
			Cart.addItemsToChart(req.params._cartid, productIds, {}, function(err, cart){
				if(err){
					throw err;
				}
				res.json(cart);
			});
		});


	cartRouter.route('/:_cartid/items/:_productid')
		.delete(function(req, res){
			Cart.removeItemsFromChart(req.params._cartid, req.params._productid, {}, function(err,cart){
				if(err){
					throw err;
				}
				res.status(200);
			});
		});

	// coupons
	cartRouter.route('/:_cartid/coupons')
		.post(function(req,res){
			var couponId = req.body.couponId;

			Coupon.getCouponById(couponId, function(err, coupon){
				if(err){
					throw err;
				}

				Cart.useCoupon(req.params._cartid, couponId, function(err, cart){
						if(err){
							throw err;
						}

						res.status(200).json(cart);
				});
			});
		});

	cartRouter.route('/:_cartid/coupons/:_couponid')
		.delete(function(req,res){
			var couponId = req.params._couponid;
			var cartId = req.params._cartid;
			
			Cart.getCartById(cartId, function(err, cart){
				if(err){
					throw err;
				}

				if (cart.couponId == couponId){
					Cart.useCoupon(cartId, "", function(err, cart){
						if(err){
							throw err;
						}

						res.status(200).json(cart);
					});
				}
			});
		});

	cartRouter.route('/:_cartid/totals')
		.get(function(req,res){
			var cartId = req.params._cartid;
			Cart.getCartById(cartId, function(err, cart){
				if(err){
					throw err;
				}

				var productIds = [];

				for(index in cart.items){
					productIds.push(cart.items[index].productId); 
				}

				Product.GetProductsByIds(productIds, function(err, products){
					var totalAmt = 0;

					for(index in products){
						totalAmt += products[index].price;
					}
					if (cart.couponId != null){
						Coupon.getCouponById(cart.couponId, function(err, coupon){
							if (err){
								res.json(totalAmt);
							} else{
								totalAmt -= coupon.value;
								res.json(totalAmt);
							}
						});
					}else{
						res.json(totalAmt);
					}
				});
			});
		});

	return cartRouter;
};

module.exports = routes;