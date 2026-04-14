const connection = require('../database');
const { DataTypes } = require('sequelize');

const Blog = connection.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'blogs',
    timestamps: true, // Tự động quản lý createdAt và updatedAt
});

module.exports = Blog;