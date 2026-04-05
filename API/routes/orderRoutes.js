const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/orders/list', OrderController.get);
router.post('/orders/add', OrderController.create);
router.get('/orders/:id', OrderController.getById);
router.put("/orders/status/:id", OrderController.updateStatus);
router.delete("/orders/:id", OrderController.delete);
router.post('/orders/add-to-cart', OrderController.addToCart);
router.get('/orders/cart/:user_id', OrderController.getCart);
router.put('/orders/cart/:id', OrderController.updateCart);
router.delete('/orders/cart/:id', OrderController.removeCart);

module.exports = router;