const BlogModel = require('../models/blogModel');

class BlogController {
    static async get(req, res) {
        try {
            const blogs = await BlogModel.findAll({
                order: [['createdAt', 'DESC']] // Sắp xếp bài viết mới nhất lên đầu
            });
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách bài viết thành công",
                data: blogs
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const blog = await BlogModel.findByPk(id);

            if (!blog) {
                return res.status(404).json({ message: "Bài viết không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { title, content } = req.body;
            const blog = await BlogModel.create({ title, content });

            res.status(201).json({
                message: "Đăng bài viết mới thành công",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            const blog = await BlogModel.findByPk(id);
            if (!blog) {
                return res.status(404).json({ message: "Bài viết không tồn tại" });
            }

            await blog.update({ title, content });

            res.status(200).json({
                message: "Cập nhật bài viết thành công",
                data: blog
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const blog = await BlogModel.findByPk(id);
            
            if (!blog) {
                return res.status(404).json({ message: "Bài viết không tồn tại" });
            }

            await blog.destroy();
            res.status(200).json({ message: "Xóa bài viết thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BlogController;