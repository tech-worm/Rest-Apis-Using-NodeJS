// importing node modules
const express = require('express');

const orderControler = require('../controllers/order');

//importing  JWT Authentication Middleware
const checkAuth = require('../middleware/check-auth');

// setting router using express
const Router = express.Router()

// ---------------------------creating requests ---------------// 

// adding a new order
Router.post('/',checkAuth, orderControler.orders_create_order);

//to get all the orders
Router.get('/', checkAuth, orderControler.orders_get_all);

// ------------------------------requests with id---------------------- //

// get a specific order
Router.get('/:orderID', checkAuth, orderControler.orders_get_order);

// to update a specific order
Router.patch('/:orderID', checkAuth, orderControler.orders_delete_order);


// to delete a specific order
Router.delete('/:orderID', checkAuth, orderControler.orders_update_order);

module.exports = Router;