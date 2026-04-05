const connection = require('../database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');
const User = require('./userModel');

const Comment = connection.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0 // 0: Chờ duyệt, 1: Hiển thị
    }
}, {
    tableName: 'comments',
    timestamps: true,
});

// Thiết lập liên kết
Comment.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Comment;