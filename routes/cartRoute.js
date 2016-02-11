var express = require('express');

var routes = function(Cart){
	var cartRouter = express.Router();

	cartRouter.route('/')
		.get(function(req, res){
			var responseJson = { title : "cart api" };

			res.json(responseJson);
		});

		return cartRouter;
};

module.exports = routes;