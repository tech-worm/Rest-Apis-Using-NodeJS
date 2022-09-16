const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (re, res, next) => {
    Product.find().select('name price quantity _id productImage').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage : doc.productImage,
                        quantity: doc.quantity,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + doc._id
                        }
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

exports.products_create_product = (req, res, next) => {
    console.log(req.file);
    const detailsProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        productImage : req.file.path
    });
    console.log(detailsProduct)
    detailsProduct.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Product Added",
            Product: {
                name: result.name,
                price: result.price,
                quantity: result.quantity,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + result._id
                }
            }
        });
    }).catch(err => console.log(err));

}


exports.products_get_product =  (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id).select('name price quantity _id productImage').exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.products_update_product = (req, res, next) => {
    const id = req.params.productID;
    const payload = req.body;
    Product.updateOne({ id: id }, { $set: payload })
    .exec()
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


exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/products",
            body: { name: "String", price: "Number" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };