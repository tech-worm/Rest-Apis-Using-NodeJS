// importing node modules
const express = require('express');
const multer = require('multer');

//importing  JWT Authentication Middleware
const checkAuth = require('../middleware/check-auth');
const productControler = require('../controllers/product');

// setting the destination and storing format of image using multer
const storage = multer.diskStorage({
    destination : function(req, file, cb){
      cb(null, './uploads/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

// setting the type of image to be uploaded
const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

// restricting the size of file to be uploaded and uploading
const upload = multer({ storage : storage, limits : {
    fileSize : 1024*1024*5
}, fileFilter : fileFilter });

// setting router using express
const Router = express.Router()

//----------------creating requests-------------------------//

//to add a new product
Router.post('/', checkAuth, upload.single('productImage'), productControler.products_create_product);

// To get all products
Router.get('/', productControler.products_get_all);



// requests with id //

// to get a product on id basis
Router.get('/:productID', productControler.products_get_product);

// to update a product
Router.patch('/:productID', checkAuth, productControler.products_update_product);

// to delete a product
Router.delete('/:productID', checkAuth, productControler.products_delete);

module.exports = Router;




