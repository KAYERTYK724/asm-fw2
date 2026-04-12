const express = require('express');
const router = express.Router();
const OrderDetailController = require('../controllers/orderDetailController');

router.get('/order-details/list', OrderDetailController.get);
router.get('/order-details/order/:order_id', OrderDetailController.getByOrderId);
router.post('/order-details/add', OrderDetailController.create);
router.delete('/order-details/:id', OrderDetailController.delete);

module.exports = router;