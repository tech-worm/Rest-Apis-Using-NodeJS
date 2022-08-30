// importing express node module
const express = require('express');
const mongoose = require('mongoose');


// setting router using express
const Router = express.Router()


// importing our product model
const Product = require('../models/product.js')



// creating requests

//to add a new product
Router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Product Added",
            Product: {
                name : result.name,
                price : result.price,
                quantity : result.quantity,
                id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:5000/products/'+result._id
                }
            } 
        });
    }).catch(err => console.log(err));
    
});

// To get all products
Router.get('/', (re, res, next) => {
    Product.find().select('name price quantity _id').exec()
        .then(docs => {
            const response = {
                count : docs.length,
                products : docs.map(doc=>{
                    return {
                        name : doc.name,
                        price : doc.price,
                        quantity : doc.quantity,
                        _id : doc._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:5000/products/'+doc._id}
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



// requests with id //

// to get a product on id basis
Router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id).select('name price quantity _id').exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

// to update a product
Router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const payload = req.body;
    Product.updateOne({ id: id }, { $set: payload }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// to delete a product
Router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.deleteOne({ _id: id })
        .exec().then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = Router;




