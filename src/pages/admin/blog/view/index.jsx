import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import './style.css';

const BlogDetail = () => {
    // Dữ liệu blog cập nhật theo mẫu mới
    const blog = {
        id: 1,
        date: '16 Tháng 2, 2020',
        author: 'Admin',
        title: 'Máy uốn tóc nào tốt nhất hiện nay',
        img: 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg',
        category: 'Làm đẹp & Chăm sóc tóc',
        content: `
            <p className="mb-3">Khám phá danh sách các loại máy uốn tóc cao cấp giúp bạn tạo kiểu chuyên nghiệp ngay tại nhà mà không gây hư tổn cho tóc. Việc lựa chọn một chiếc máy uốn tóc phù hợp không chỉ giúp bạn có mái tóc đẹp mà còn bảo vệ sợi tóc khỏi tác động nhiệt quá lớn.</p>
            
            <h5 className="text-white mt-4 mb-3">1. Tiêu chí chọn máy uốn tóc tốt</h5>
            <p>Để đánh giá một chiếc máy uốn tóc tốt, chúng ta cần dựa trên chất liệu thanh nhiệt (Gốm, Tourmaline hoặc Titan), khả năng kiểm soát nhiệt độ và kích thước trục uốn phù hợp với độ dài tóc.</p>
            
            <h5 className="text-white mt-4 mb-3">2. Các dòng máy khuyên dùng</h5>
            <p>Các thương hiệu nổi tiếng hiện nay thường tích hợp công nghệ ion âm để giữ độ ẩm cho tóc, giảm thiểu tình trạng xơ rối sau khi tạo kiểu...</p>
        `
    };

    return (
        <Container fluid className="pt-4 px-4 detail-blog-container">
            <Row className="g-4">
                {/* Cột bên trái: Hình ảnh bài viết (Sticky) */}
                <Col md={5} lg={4}>
                    <div className="bg-secondary rounded p-4 h-100 text-center border-0">
                        <div className="sticky-top" style={{ top: '25px', zIndex: 1 }}>
                            <img 
                                src={blog.img} 
                                alt={blog.title}
                                className="img-fluid rounded shadow-lg border-dark-custom"
                                style={{ maxHeight: '550px', width: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </Col>

                {/* Cột bên phải: Nội dung chi tiết */}
                <Col md={7} lg={8}>
                    <div className="bg-secondary rounded p-4 h-100 shadow-sm text-start">
                        {/* Nhãn danh mục */}
                        <div className="mb-2">
                            <span className="text-danger-custom fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                                {blog.category}
                            </span>
                        </div>

                        <h2 className="mb-3 text-white fw-bold border-bottom-red pb-3">
                            {blog.title}
                        </h2>

                        {/* Metadata: Ngày đăng & Tác giả */}
                        <div className="d-flex flex-wrap gap-4 mb-4 mt-3">
                            <div className="d-flex align-items-center text-light-gray">
                                <FaCalendarAlt className="text-danger-custom me-2" />
                                <span>{blog.date}</span>
                            </div>
                            <div className="d-flex align-items-center text-light-gray">
                                <FaUser className="text-danger-custom me-2" />
                                <span>Đăng bởi: {blog.author}</span>
                            </div>
                        </div>

                        <hr className="border-dark opacity-25" />

                        {/* Phần thân bài viết */}
                        <div className="blog-content text-light-gray mt-4">
                            <div 
                                className="content-render"
                                style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
                                dangerouslySetInnerHTML={{ __html: blog.content }} 
                            />
                        </div>

                        {/* Thanh hành động */}
                        <div className="mt-5 pt-4 border-top border-dark d-flex flex-wrap gap-3">
                            <Button variant="warning" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center btn-edit-custom">
                                <FaEdit className="me-2" /> Chỉnh sửa bài viết
                            </Button>
                            <Button variant="outline-light" className="rounded-pill px-4 d-flex align-items-center btn-back-custom">
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