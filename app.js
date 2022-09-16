// importing express node module
const express = require('express');
// importing morgan used for loging
const morgan = require('morgan');
// body-parser to parse header and request methods
const bodyParser = require('body-parser');
//importing mongoose for db connection
const mongoose = require('mongoose');
// multer is being used for handling image uploads
const multer = require('multer');
// importing routes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

//connecting to db
const db = mongoose.connect('mongodb+srv://rest-apis:rest-apis@rest-apis.cop58bo.mongodb.net/test')
if (db) {
    console.log('success');
} else {
    console.log('DB not Connected');
}

// creating express app
const app = express();

// adding middlewares

//using morgan for loging
app.use(morgan('dev'));
// Making the uploads folder public to access file publically
app.use('/uploads', express.static('uploads'));
// ading body parser to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//using routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);



// Handling custom errors
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