const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');

class ProductController {
    static async get(req, res) {
        try {
            const products = await ProductModel.findAll({
                include: [{ model: CategoryModel, as: 'category', attributes: ['name'] }]
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
            const product = await ProductModel.findByPk(id);
            
            if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại" });

            await product.destroy();
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;