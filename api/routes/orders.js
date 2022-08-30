// importing express node module
const express = require('express');

const mongoose = require('mongoose');
// importing order model
const Order = require('../models/order');

// setting router using express
const Router = express.Router()


// creating requests // 

// adding a new order
Router.route('/').post((req, res, next) => {
    const order = new Order({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });
    order.save().then(result => {
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
                    url : 'http://localhost:5000/orders/'+result._id
                }
            } 
        });
    }).catch(err => console.log(err));
});

//to get all the orders
Router.get('/', (re, res, next) => {
    Order.find().select('name price quantity _id').exec()
    .then(docs => {
        const response = {
            count : docs.length,
            orders : docs.map(doc=>{
                return {
                    name : doc.name,
                    price : doc.price,
                    quantity : doc.quantity,
                    _id : doc._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:5000/orders/'+doc._id}
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


// get a specific order
Router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    Order.findById(id).select('name price quantity _id').exec().then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(400).json({
                message: "No valid entry found"
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

// to update a specific order
Router.patch('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    let payload = req.body
    Order.updateOne({ id: id }, { $set: payload }).exec()
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


// to delete a specific order
Router.delete('/:orderID', (req, res, next) => {
    const _id = req.params.orderID;
    Order.deleteOne({ id: _id }).exec().then(result => {
        res.status(200).json({
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = Router;