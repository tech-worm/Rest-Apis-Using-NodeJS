// importing express node module
const express = require('express');
// importing morgan used for loging
const morgan = require('morgan');
// body-parser to parse header and request methods
const bodyParser = require('body-parser');
//importing mongoose for db connection
const mongoose = require('mongoose');


// importing routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//connecting to db
const db = mongoose.connect('mongodb+srv://rest-apis:rest-apis@rest-apis.cop58bo.mongodb.net/test')
if (db) {
    console.log('success');
}

// creating express app
const app = express();

//using morgan for loging
app.use(morgan('dev'));
// ading body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//using routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// Handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//exporting app
module.exports = app;