const Order = require('./orderModel');
const OrderDetail = require('./orderDetailModel');
const Product = require('./productModel');

// Order - OrderDetail
Order.hasMany(OrderDetail, {
  foreignKey: 'order_id',
  as: 'orderDetails' // ✅ đúng với controller
});

OrderDetail.belongsTo(Order, {
  foreignKey: 'order_id'
});

// OrderDetail - Product
OrderDetail.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});