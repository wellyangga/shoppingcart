var express = require('express');

var routes = function(Coupon){
	var couponRouter = express.Router();

	couponRouter.route('/')
		.get(function(req, res){
			var responseJson = { title : "coupon api" };

			res.json(responseJson);
		});

		return couponRouter;
};

module.exports = routes;