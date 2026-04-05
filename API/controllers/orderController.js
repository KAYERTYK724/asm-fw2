const OrderModel = require('../models/orderModel');
const UserModel = require('../models/userModel');
const OrderDetailModel = require('../models/orderDetailModel');
const ProductModel = require('../models/productModel');

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

    static async addToCart(req, res) {
        try {
            const { user_id, product_id, quantity } = req.body;

            // 1. tìm cart hiện tại
            let order = await OrderModel.findOne({
                where: {
                    user_id,
                    order_status: 0
                }
            });

            // 2. nếu chưa có thì tạo cart
            if (!order) {
                order = await OrderModel.create({
                    user_id,
                    name: "Cart",
                    phone: "0000000000",
                    order_status: 0
                });
            }

            // 3. lấy thông tin sản phẩm
            const product = await ProductModel.findByPk(product_id);
            if (!product) {
                return res.status(404).json({ message: "Sản phẩm không tồn tại" });
            }

            // 4. kiểm tra sản phẩm đã có trong cart chưa
            let item = await OrderDetailModel.findOne({
                where: {
                    order_id: order.id,
                    product_id
                }
            });

            if (item) {
                // đã có → tăng số lượng
                await item.update({
                    quantity: item.quantity + quantity
                });
            } else {
                // chưa có → tạo mới
                item = await OrderDetailModel.create({
                    order_id: order.id,
                    product_id,
                    quantity,
                    price: product.price
                });
            }

            return res.status(200).json({
                message: "Thêm vào giỏ hàng thành công",
                data: item
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCart(req, res) {
        try {
            const { user_id } = req.params;

            const order = await OrderModel.findOne({
                where: {
                    user_id,
                    order_status: 0
                },
                include: [{
                    model: OrderDetailModel,
                    as: 'orderDetails',
                    include: [{
                        model: ProductModel,
                        as: 'product' // ✅ PHẢI có as
                    }]
                }]
            });

            if (!order) {
                return res.status(200).json({ data: [] });
            }

            res.status(200).json({
                data: order.orderDetails
            });

        } catch (error) {
            console.log("🔥 CART ERROR:", error); // 👈 thêm dòng này để debug
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCart(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            const item = await OrderDetailModel.findByPk(id);

            if (!item) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }

            item.quantity = Number(quantity);
            await item.save();

            res.status(200).json({ message: "Cập nhật thành công" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async removeCart(req, res) {
        try {
            const { id } = req.params;

            const item = await OrderDetailModel.findByPk(id);

            if (!item) {
                return res.status(404).json({ message: "Không tồn tại" });
            }

            await item.destroy();

            res.status(200).json({ message: "Đã xoá" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderController;