import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import requestAPI from '../../../../RequestAPI';
import './style.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const res = await requestAPI({ method: 'GET', url: `/blogs/${id}` });
            if (res?.data?.data) {
                setBlog(res.data.data);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <Container fluid className="pt-4 px-4 text-center">
                <Spinner animation="border" role="status" variant="light">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container fluid className="pt-4 px-4 text-center text-white">
                <p>Bài viết không tồn tại hoặc đã bị xóa.</p>
                <Button variant="secondary" onClick={() => navigate('/admin/blogAdmin')}>
                    Quay lại danh sách
                </Button>
            </Container>
        );
    }

    return (
        <Container fluid className="pt-4 px-4 detail-blog-container">
            <Row className="g-4">
                <Col md={5} lg={4}>
                    <div className="bg-secondary rounded p-4 h-100 text-center border-0">
                        <div className="sticky-top" style={{ top: '25px', zIndex: 1 }}>
                            <img
                                src={blog.image || 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg'}
                                alt={blog.title}
                                className="img-fluid rounded shadow-lg border-dark-custom"
                                style={{ maxHeight: '550px', width: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </Col>

                <Col md={7} lg={8}>
                    <div className="bg-secondary rounded p-4 h-100 shadow-sm text-start">
                        <div className="mb-2">
                            <span className="text-danger-custom fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                                {blog.category || 'Tin tức'}
                            </span>
                        </div>

                        <h2 className="mb-3 text-white fw-bold border-bottom-red pb-3">
                            {blog.title}
                        </h2>

                        <div className="d-flex flex-wrap gap-4 mb-4 mt-3">
                            <div className="d-flex align-items-center text-light-gray">
                                <FaCalendarAlt className="text-danger-custom me-2" />
                                <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                            </div>
                            <div className="d-flex align-items-center text-light-gray">
                                <FaUser className="text-danger-custom me-2" />
                                <span>Đăng bởi: {blog.author || 'Admin'}</span>
                            </div>
                        </div>

                        <hr className="border-dark opacity-25" />

                        <div className="blog-content text-light-gray mt-4">
                            <div
                                className="content-render"
                                style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
                                dangerouslySetInnerHTML={{ __html: blog.content || 'Nội dung đang trống.' }}
                            />
                        </div>

                        <div className="mt-5 pt-4 border-top border-dark d-flex flex-wrap gap-3">
                            <Button
                                variant="warning"
                                className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center btn-edit-custom"
                                onClick={() => navigate(`/admin/editBlog/${id}`)}
                            >
                                <FaEdit className="me-2" /> Chỉnh sửa bài viết
                            </Button>
                            <Button
                                variant="outline-light"
                                className="rounded-pill px-4 d-flex align-items-center btn-back-custom"
                                onClick={() => navigate('/admin/blogAdmin')}
                            >
                                <FaArrowLeft className="me-2" /> Trở lại danh sách
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogDetail;
