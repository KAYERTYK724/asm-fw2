const OrderModel = require('../models/orderModel');
const UserModel = require('../models/userModel');

class OrderController {
    static async get(req, res) {
        try {
            const orders = await OrderModel.findAll({
                include: [{ model: UserModel, as: 'user', attributes: ['fullname', 'email'] }],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách đơn hàng thành công",
                data: orders
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.findByPk(id, {
                include: [{ model: UserModel, as: 'user', attributes: ['fullname', 'email'] }]
            });

            if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

            res.status(200).json({ status: 200, data: order });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const orderData = req.body;
            const order = await OrderModel.create(orderData);
            res.status(201).json({
                message: "Đặt hàng thành công",
                data: order
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { order_status, payment_status } = req.body;

            const order = await OrderModel.findByPk(id);
            if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

            await order.update({ order_status, payment_status });
            res.status(200).json({ message: "Cập nhật trạng thái đơn hàng thành công", data: order });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderModel.findByPk(id);
            if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

            await order.destroy();
            res.status(200).json({ message: "Xóa đơn hàng thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderController;