const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");



exports.orders_get_all =  (re, res, next) => {
    Order.find().select('product price quantity _id').populate('product', 'name price id ').exec()
    .then(docs => {
        const response = {
            count : docs.length,
            orders : docs.map(doc=>{
                return {
                    product : doc.product,
                    product_link : 'http://localhost:5000/products/'+doc.product._id,
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
}


exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.product).then(product=>{
        if (!product)
        {
            return res.status(404).json({
                Message : "Product not found."
            });
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            price: req.body.price,
            quantity: req.body.quantity,
            product : req.body.product
        });
        return order.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Order Added",
            Product: {
                product : 'http://localhost:5000/products/'+result.product,
                price : result.price,
                quantity : result.quantity,
                id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:5000/orders/'+result._id
                }
            } 
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error :err
        });
    });
}


exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderID;
    Order.findById(id).select('name price quantity _id').populate('product', 'name price, quantity id').exec().then(doc => {
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
}


exports.orders_delete_order = (req, res, next) => {
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
}


exports.orders_update_order =  (req, res, next) => {
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
}