var express = require('express');

var routes = function(Product){
	var productRouter = express.Router();

	productRouter.route('/')
		.get(function(req, res){
			var responseJson = { title : "product api" };

			res.json(responseJson);
		});

		return productRouter;
};

module.exports = routes;