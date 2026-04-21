const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');
const OrderDetailModel = require('../models/orderDetailModel');
const OrderModel = require('../models/orderModel');
const { Op } = require('sequelize');
class ProductController {
    static async get(req, res) {
        try {
            const { categoryId } = req.query; // 👈 lấy từ query

            let condition = {};

            // nếu có categoryId thì lọc
            if (categoryId) {
                condition.category_id = categoryId;
            }

            const products = await ProductModel.findAll({
                where: condition, //  thêm dòng này
                include: [
                    {
                        model: CategoryModel,
                        as: 'category',
                        attributes: ['name']
                    }
                ]
            });

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách sản phẩm thành công",
                data: products
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findByPk(id, {
                include: [{ model: CategoryModel, as: 'category', attributes: ['name'] }]
            });

            if (!product) {
                return res.status(404).json({ message: "Sản phẩm không tồn tại" });
            }

            res.status(200).json({ status: 200, data: product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const data = req.body;
            const product = await ProductModel.create(data);
            res.status(201).json({ message: "Thêm sản phẩm thành công", product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const product = await ProductModel.findByPk(id);
            
            if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });

            await product.update(data);
            res.status(200).json({ message: "Cập nhật thành công", product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            // 1️⃣ kiểm tra product tồn tại
            const product = await ProductModel.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Sản phẩm không tồn tại" });
            }

            // 2️⃣ kiểm tra có trong order chưa
            const count = await OrderDetailModel.count({
                include: [
                    {
                        model: OrderModel,
                        required: true
                    }
                ],
                where: {
                    product_id: Number(id)
                }
            });

            console.log("COUNT:", count);

            // ❌ nếu có trong đơn hàng → chặn
            if (count > 0) {
                return res.status(400).json({
                    message: "Không thể xóa vì sản phẩm đã có trong đơn hàng"
                });
            }

            // ✅ cho xóa
            await product.destroy();

            return res.status(200).json({
                message: "Xóa sản phẩm thành công"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController; 