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
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    payments: {
        type: DataTypes.STRING(50),
        defaultValue: 'cod'
    },
    payment_status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    },
    order_status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    }
}, {
    tableName: 'orders',
    timestamps: true,
});

Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Order;