// importing mongoose for db 
const mongoose = require('mongoose');

// creating a Schema
const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{type : String, required : true},
    price: {type : Number, required : true},
    quantity: {type : Number, required :true},
    productImage : {type : String}
});

module.exports = mongoose.model('Product', productSchema);

