// importing mongoose for db 
const mongoose = require('mongoose');

// creating a Schema
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email:{
        type : String, 
        required : true, 
        unique : true, 
        match : /[a-z0-9]+@[a-z]+.[a-z]{2,3}/
    },
    password: {type : String, required : true},
    
});

module.exports = mongoose.model('User', userSchema);