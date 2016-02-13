var express = require('express');

var routes = function(Product){
	var productRouter = express.Router();

	productRouter.route('/')
		.get(function(req, res){
			Product.getProducts(function(err, product){
			if(err){
					throw err;
				}
				res.json(product);
			});
		})
		.post(function(req,res){
			var product = req.body;
			Product.addProduct(product, function(err, product){
				if(err){
					throw err;
				}
				res.status(201).json(product);
			});
		});

	productRouter.route('/:_productid')
		.get(function(req, res){
			Product.getProductById(req.params._productid, function(err, product){
				if(err){
					throw err;
				}
				res.json(product);
			});
		})
		.put(function(req, res){
			var id = req.params._productid;
			var product = req.body;
			Product.updateProduct(id, product, {}, function(err, product){
				if(err){
					throw err;
				}
				res.json(product);
			});
		})
		.delete(function(req, res){
			var id = req.params._productid;
			Product.removeProduct(id, function(err, product){
				if(err){
					throw err;
				}
				res.json(product);
			});
		});

	return productRouter;
};

module.exports = routes;