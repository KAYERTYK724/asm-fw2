import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import requestAPI from '../../../RequestAPI';
import './style.css';

const BlogListAdmin = () => {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const fetchBlogs = async () => {
        setLoading(true);
        const res = await requestAPI({ method: 'GET', url: '/blogs/list' });
        if (res?.data?.data) {
            setBlogData(res.data.data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này?');
        if (!confirmed) return;

        setDeletingId(id);
        const res = await requestAPI({ method: 'DELETE', url: `/blogs/${id}` });
        setDeletingId(null);

        if (res) {
            alert('Xóa bài viết thành công');
            fetchBlogs();
        }
    };

    if (loading) {
        return (
            <Container fluid className="pt-4 px-4 text-center">
                <Spinner animation="border" role="status" variant="light">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="mb-0 text-white fw-bold">DANH SÁCH BÀI VIẾT</h4>
                    <Button as={Link} to='/admin/addBlog' variant="success" className="rounded-pill">
                        <FaPlusSquare />
                    </Button>
                </div>

                <div className="table-responsive">
                    <Table hover bordered className="text-start align-middle mb-0 custom-table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TIÊU ĐỀ</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">NỘI DUNG</th>
                                <th scope="col">NGÀY ĐĂNG</th>
                                <th scope="col">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData.map((blog, index) => (
                                <tr key={blog.id || index}>
                                    <td>{index + 1}</td>
                                    <td className="text-white">{blog.title || 'Tiêu đề bài viết...'}</td>
                                    <td>
                                        <img
                                            src={blog.image || 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg'}
                                            alt="blog"
                                            style={{ width: '100px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td style={{ maxWidth: '500px' }}>
                                        <div className="text-truncate-2">
                                            {blog.content?.length > 120 ? `${blog.content.slice(0, 120)}...` : blog.content}
                                        </div>
                                    </td>
                                    <td>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button onClick={() => navigate(`/admin/viewBlog/${blog.id}`)} size="sm" variant="info" className="rounded-pill px-3">
                                                <FaEye className="text-white" />
                                            </Button>
                                            <Button onClick={() => navigate(`/admin/editBlog/${blog.id}`)} size="sm" variant="warning" className="rounded-pill px-3">
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(blog.id)}
                                                disabled={deletingId === blog.id}
                                                size="sm"
                                                variant="danger"
                                                className="rounded-pill px-3"
                                            >
                                                {deletingId === blog.id ? 'Đang xóa...' : <FaTrashAlt />}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    );
};

export default BlogListAdmin;