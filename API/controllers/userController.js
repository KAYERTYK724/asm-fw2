const UserModel = require('../models/userModel');

//  THÊM
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            const { email, password, name } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Thiếu email hoặc password" });
            }

            const existingUser = await UserModel.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Email đã tồn tại" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                email,
                username: email,
                password: hashedPassword,
                fullname: name
            });

            const { password: pw, ...data } = user.toJSON();

            res.status(201).json({
                message: "Đăng ký thành công",
                data
            });

        } catch (error) {
            console.log("ERROR REGISTER:", error);
            res.status(500).json({ error: error.message });
        }
    }

    // THÊM MỚI: Đăng nhập
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(400).json({ message: "Email không tồn tại" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Sai mật khẩu" });
            }

            // tạo token
            const token = jwt.sign(
                { id: user.id },
                "SECRET_KEY",
                { expiresIn: "1d" }
            );

            const { password: pw, ...userWithoutPassword } = user.toJSON();

            res.status(200).json({
                message: "Đăng nhập thành công",
                token,
                user: userWithoutPassword
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