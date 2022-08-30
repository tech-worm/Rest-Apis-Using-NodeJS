// importing mongoose for db 
const mongoose = require('mongoose');

// creating a Schema
const productSchema = mongoose.Schema({

    name:{type : String, required : true},
    price: {type : Number, required : true},
    quantity: {type : Number, required : true}
});

module.exports = mongoose.model('Product', productSchema);

