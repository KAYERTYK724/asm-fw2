const connection = require('../database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');
const Order = require('./orderModel');

const OrderDetail = connection.define('OrderDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'orders', key: 'id' }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    }
}, {
    tableName: 'order_details',
    timestamps: true,
});

OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = OrderDetail;