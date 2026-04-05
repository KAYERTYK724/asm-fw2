const OrderDetailModel = require('../models/orderDetailModel');
const ProductModel = require('../models/productModel');

class OrderDetailController {
    // Lấy toàn bộ chi tiết của tất cả các đơn (thường dành cho Admin)
    static async get(req, res) {
        try {
            const details = await OrderDetailModel.findAll({
                include: [{ model: ProductModel, as: 'product', attributes: ['name', 'image'] }]
            });
            res.status(200).json({ status: 200, data: details });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy chi tiết của một Đơn hàng cụ thể (Quan trọng nhất)
    static async getByOrderId(req, res) {
        try {
            const { order_id } = req.params;
            const details = await OrderDetailModel.findAll({
                where: { order_id },
                include: [{ model: ProductModel, as: 'product', attributes: ['name', 'image'] }]
            });

            res.status(200).json({
                status: 200,
                message: `Chi tiết đơn hàng #${order_id}`,
                data: details
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const data = req.body; // Có thể là 1 object hoặc 1 mảng các object
            const detail = await OrderDetailModel.create(data);
            res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công", detail });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const detail = await OrderDetailModel.findByPk(id);
            if (!detail) return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng" });

            await detail.destroy();
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderDetailController;