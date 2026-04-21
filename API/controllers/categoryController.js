const CategoryModel = require('../models/categoryModel');
const ProductModel = require('../models/productModel');
const OrderDetailModel = require('../models/orderDetailModel');
const { Op } = require('sequelize');

class CategoryController {

    static async get(req, res) {
        try {
            const categories = await CategoryModel.findAll();

            const result = await Promise.all(categories.map(async (c) => {

                const products = await ProductModel.findAll({
                    where: { category_id: c.id }
                });

                if (products.length === 0) {
                    return { ...c.toJSON(), canDelete: true };
                }

                const productIds = products.map(p => p.id);

                const count = await OrderDetailModel.count({
                    where: {
                        product_id: {
                            [Op.in]: productIds
                        }
                    }
                });

                return {
                    ...c.toJSON(),
                    canDelete: count === 0 && products.length === 0
                };
            }));

            res.status(200).json({
                status: 200,
                data: result
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "data": category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { name } = req.body;
            const category = await CategoryModel.create({ name });

            res.status(201).json({
                message: "Thêm mới thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            category.name = name;
            await category.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Danh mục không tồn tại" });
            }

            const products = await ProductModel.findAll({
                where: { category_id: id }
            });

            if (products.length > 0) {
                const productIds = products.map(p => p.id);

                const count = await OrderDetailModel.count({
                    where: {
                        product_id: {
                            [Op.in]: productIds
                        }
                    }
                });

                if (count > 0) {
                    return res.status(400).json({
                        message: "Không thể xóa vì sản phẩm đã có trong đơn hàng"
                    });
                }

                return res.status(400).json({
                    message: "Không thể xóa vì danh mục vẫn còn sản phẩm"
                });
            }

            await category.destroy();

            res.status(200).json({
                message: "Xóa danh mục thành công"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;
