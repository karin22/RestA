var express = require('express');
/////require mongoose product
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coc'), { useNewUrlParser: true , useUnifiedTopology: true } ; // connect to our database

var Product = require('./models/produtc');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(express.static('www'))
// index page
app.get('/', function (req, res) {
res.send('Express is running');
});
app.get('/api', function (req, res) {
    var version = { version: "1.0b"}
    res.json(version);
    });
    ///////////Product APIs
 app.post('/api/products', function (req, res) {
        ///////////insert data to product
        var newproduct = req.body;
        var product = new Product(newproduct);
        product.save(function(err) {
            if (err)  res.status(500).json(err);
            res.json({status: "Added a product"});
        });
        });


app.get('/api/json', function (req, res) {
    res.json({
    status: 'success',
    message: 'REST API is working'
    });
    });
///// findAll
app.get('/api/products', function (req, res) {
    Product.find(function(err,products) {
        if (err)  res.status(500).json(err);
        res.json(products);
    });
        });
///// findbyID
app.get('/api/products/:id', function (req, res) {
    var id = req.params.id;
            Product.find({"_id":id},function(err,products) {
                if (err)  res.status(500).json(err);
                res.json(products);
            });
});
     
// update
app.put('/api/products/:id', function (req, res) {
    var id = req.params.id;
    var updateproduct = req.body;
            Product.findByIdAndUpdate(id,updateproduct,function(err,products) {
                if (err)  res.status(500).json(err);
                res.json({status: "Update a procuct"});
            });
});

// delete
app.delete('/api/products/:id', function (req, res) {
    var id = req.params.id;
            Product.findByIdAndRemove(id,function(err,products) {
                if (err)  res.status(500).json(err);
                res.json({status: "Delete a procuct"});
            });
});

        var port = process.env.PORT || 8080;
        app.listen(port, function () {
        console.log('App is running on http://localhost:' + port);
        });