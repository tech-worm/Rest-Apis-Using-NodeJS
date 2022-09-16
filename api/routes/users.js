// importing node modules
const express = require('express');

// importing user model
const userControler = require('../controllers/user');

// setting up router
const Router = express.Router()

// signup route 
Router.post('/signup' , userControler.user_signup);


//login route
Router.post('/login', userControler.user_login);

// delete user route
Router.delete('/:userID', userControler.user_delete);

module.exports = Router;