const connection = require('../database');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Order = connection.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    payments: {
        type: DataTypes.STRING(50),
        defaultValue: 'cod'
    },
    payment_status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0 // 0: Chưa thanh toán, 1: Đã thanh toán
    },
    order_status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0 // 0: Chờ xác nhận, 1: Đang giao, 2: Hoàn thành, 3: Đã hủy
    }
}, {
    tableName: 'orders',
    timestamps: true,
});

// Liên kết với User để biết đơn hàng của ai
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Order;