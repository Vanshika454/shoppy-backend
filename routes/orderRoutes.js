const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order/orderController');

const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

//Create order
router.post('/', auth, orderController.createOrder);

//Get user orders
router.get('/user/:userId', auth, orderController.getUserOrders);

//Get all orders
router.get('/', auth, admin, orderController.getAllOrders);

//Get Order by id
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;