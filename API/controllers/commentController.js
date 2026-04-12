const CommentModel = require('../models/commentModel');
const UserModel = require('../models/userModel');

class CommentController {
    static async get(req, res) {
        try {
            const comments = await CommentModel.findAll({
                where: { status: 1 },
                include: [
                    { model: UserModel, as: 'user', attributes: ['fullname', 'username'] }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách bình luận thành công",
                data: comments
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ FIX CHUẨN: hiển thị comment theo product + đã duyệt
    static async getByProduct(req, res) {
        try {
            const { product_id } = req.params;

            const comments = await CommentModel.findAll({
                where: { 
                    product_id: Number(product_id),
                    status: 1 // 🔥 QUAN TRỌNG NHẤT
                },
                include: [
                    { model: UserModel, as: 'user', attributes: ['fullname'] }
                ],
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                data: comments
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ auto duyệt comment
    static async create(req, res) {
        try {
            const { content, product_id, user_id } = req.body;

            const comment = await CommentModel.create({
                content,
                product_id: Number(product_id),
                user_id,
                status: 1 // ✅ auto hiển thị luôn
            });

            res.status(201).json({
                message: "Gửi bình luận thành công",
                data: comment
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const comment = await CommentModel.findByPk(id);
            
            if (!comment) {
                return res.status(404).json({ message: "Không tìm thấy bình luận" });
            }

            comment.status = status;
            await comment.save();

            res.status(200).json({
                message: "Cập nhật trạng thái thành công",
                data: comment
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const comment = await CommentModel.findByPk(id);
            if (!comment) {
                return res.status(404).json({ message: "Không tìm thấy bình luận" });
            }

            await comment.destroy();

            res.status(200).json({
                message: "Xóa bình luận thành công"
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CommentController;