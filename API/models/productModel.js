const connection = require('../database');
const { DataTypes } = require('sequelize');
const Category = require('./categoryModel');

const Product = connection.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    sale_price: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
    }
}, {
    tableName: 'products',
    timestamps: true,
});

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = Product;