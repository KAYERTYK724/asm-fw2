import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield, FaClock } from 'react-icons/fa';
import './style.css';

const UserDetail = () => {
    // Giả lập dữ liệu người dùng dựa trên cấu trúc userData của bạn
    const user = {
        id: 1,
        name: "Nguyễn Văn A",
        email: "vanna@gmail.com",
        phone: "0987.654.321",
        address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
        role: "admin", // admin hoặc user
        status: 1, // 1: Hoạt động, 0: Bị khóa
        joinDate: "10 Tháng 1, 2024",
        avatar: "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
    };

    return (
        <Container fluid className="pt-4 px-4 detail-user-container">
            <Row className="g-4">
                {/* Cột bên trái: Ảnh đại diện (Avatar) */}
                <Col md={5} lg={4}>
                    <div className="bg-secondary rounded p-4 h-100 text-center border-0 shadow-sm">
                        <div className="sticky-top" style={{ top: '25px', zIndex: 1 }}>
                            <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="img-fluid rounded-circle shadow-lg border-dark-custom mb-3"
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                            <h4 className="text-white fw-bold mb-1">{user.name}</h4>
                            <p className="text-danger-custom fw-bold text-uppercase small">{user.role}</p>
                            
                            <div className="mt-3">
                                {user.status === 1 ? (
                                    <Badge bg="success" className="rounded-pill px-4 py-2">Đang hoạt động</Badge>
                                ) : (
                                    <Badge bg="danger" className="rounded-pill px-4 py-2">Đang bị khóa</Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Cột bên phải: Thông tin chi tiết */}
                <Col md={7} lg={8}>
                    <div className="bg-secondary rounded p-4 h-100 shadow-sm text-start">
                        <h3 className="mb-4 text-white fw-bold border-bottom-red pb-3">
                            THÔNG TIN CHI TIẾT
                        </h3>

                        <Row className="mb-4 gy-4">
                            <Col md={6}>
                                <div className="info-item">
                                    <label className="text-danger-custom fw-bold small text-uppercase d-block mb-1">Email</label>
                                    <div className="d-flex align-items-center text-light-gray">
                                        <FaEnvelope className="me-2 text-white" />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="info-item">
                                    <label className="text-danger-custom fw-bold small text-uppercase d-block mb-1">Số điện thoại</label>
                                    <div className="d-flex align-items-center text-light-gray">
                                        <FaPhone className="me-2 text-white" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="info-item">
                                    <label className="text-danger-custom fw-bold small text-uppercase d-block mb-1">Vai trò</label>
                                    <div className="d-flex align-items-center text-light-gray">
                                        <FaUserShield className="me-2 text-white" />
                                        <span>{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="info-item">
                                    <label className="text-danger-custom fw-bold small text-uppercase d-block mb-1">Ngày tham gia</label>
                                    <div className="d-flex align-items-center text-light-gray">
                                        <FaClock className="me-2 text-white" />
                                        <span>{user.joinDate}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="info-item">
                                    <label className="text-danger-custom fw-bold small text-uppercase d-block mb-1">Địa chỉ</label>
                                    <div className="d-flex align-items-center text-light-gray">
                                        <FaMapMarkerAlt className="me-2 text-white" />
                                        <span>{user.address}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <hr className="border-dark opacity-25" />

                        <div className="mt-4 text-light-gray">
                            <h5 className="text-white fw-bold mb-3">Ghi chú hệ thống:</h5>
                            <p>Tài khoản này có quyền truy cập vào hệ thống quản lý {user.role === 'admin' ? 'toàn diện' : 'cơ bản'}. Mọi thay đổi về quyền hạn phải được thực hiện bởi Quản trị viên cấp cao.</p>
                        </div>

                        {/* Thanh hành động */}
                        <div className="mt-5 pt-4 border-top border-dark d-flex flex-wrap gap-3">
                            <Button variant="warning" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center btn-edit-custom">
                                <FaEdit className="me-2" /> Chỉnh sửa thành viên
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

export default UserDetail;