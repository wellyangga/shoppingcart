var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

// define models
Cart = require('./models/cartModel');
Coupon = require('./models/couponModel');
Product = require('./models/productModel');

// define routes
cartRouter = require('./routes/cartRoute')(Cart,Product,Coupon);
couponRouter = require('./routes/couponRoute')(Coupon);
productRouter = require('./routes/productRoute')(Product);

app.use('/api/carts', cartRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/products', productRouter);

mongoose.connect('mongodb://localhost/shopingcart');

var db = mongoose.connection;

app.get('/', function(req,res){
	res.send('Welcome to my API!');
})

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});