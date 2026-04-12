const UserModel = require('../models/userModel');

class UserController {
    static async get(req, res) {
        try {
            // Sử dụng attributes để loại bỏ trường password khi lấy danh sách
            const users = await UserModel.findAll({
                attributes: { exclude: ['password'] }
            });
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách người dùng thành công",
                data: users
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }

            res.status(200).json({ status: 200, data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const userData = req.body;
            // Lưu ý: Trong thực tế, bạn nên hash password trước khi lưu vào DB
            const user = await UserModel.create(userData);
            
            // Ẩn password trước khi phản hồi
            const { password, ...userWithoutPassword } = user.toJSON();

            res.status(201).json({
                message: "Tạo tài khoản thành công",
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }

            await user.update(updateData);
            res.status(200).json({ message: "Cập nhật tài khoản thành công", data: user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findByPk(id);
            
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại" });
            }

            await user.destroy();
            res.status(200).json({ message: "Xóa tài khoản thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;