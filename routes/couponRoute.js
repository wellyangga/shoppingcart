var express = require('express');

var routes = function(Coupon){
	var couponRouter = express.Router();

	couponRouter.route('/')
		.get(function(req, res){
			Coupon.getCoupons(function(err, coupon){
			if(err){
					throw err;
				}
				res.json(coupon);
			});
		})
		.post(function(req,res){
			var coupon = req.body;
			Coupon.addCoupon(coupon, function(err, coupon){
				if(err){
					throw err;
				}
				res.status(201).json(coupon);
			});
		});

	couponRouter.route('/:_couponid')
		.get(function(req, res){
			Coupon.getCouponById(req.params._couponid, function(err, coupon){
				if(err){
					throw err;
				}
				res.json(coupon);
			});
		})
		.put(function(req, res){
			var id = req.params._couponid;
			var coupon = req.body;
			Coupon.updateCoupon(id, coupon, {}, function(err, coupon){
				if(err){
					throw err;
				}
				res.json(coupon);
			});
		})
		.delete(function(req, res){
			var id = req.params._couponid;
			Coupon.removeCoupon(id, function(err, coupon){
				if(err){
					throw err;
				}
				res.json(coupon);
			});
		});

	return couponRouter;
};

module.exports = routes;