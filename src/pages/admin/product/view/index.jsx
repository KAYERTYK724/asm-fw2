import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaTags, FaBoxes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './style.css';

const ProductDetail = () => {
    // Dữ liệu sản phẩm mẫu dựa trên bộ data bạn đã cung cấp
    const product = {
        id: 1,
        name: 'Áo khoác Biker Piqué',
        price: 120000,
        sale_price: 100000,
        img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
        category: 'Áo khoác',
        status: 1, // 1: Còn hàng, 0: Hết hàng
        description: `
            <p>Áo khoác phong cách Biker với chất liệu vải Piqué cao cấp, mang lại sự thoải mái và vẻ ngoài nam tính. Đây là lựa chọn hoàn hảo cho những ngày thời tiết giao mùa hoặc những chuyến đi phượt nhẹ nhàng.</p>
            <ul>
                <li>Chất liệu: Cotton Piqué bền bỉ, thoáng khí.</li>
                <li>Thiết kế: Khóa kéo chéo đặc trưng, túi hông tiện lợi.</li>
                <li>Màu sắc: Đen basic dễ phối đồ.</li>
            </ul>
        `
    };

    return (
        <Container fluid className="pt-4 px-4 detail-product-container">
            <Row className="g-4">
                {/* Cột bên trái: Hình ảnh sản phẩm (Sticky) */}
                <Col md={5} lg={4}>
                    <div className="bg-secondary rounded p-4 h-100 text-center border-0 shadow-sm">
                        <div className="sticky-top" style={{ top: '25px', zIndex: 1 }}>
                            <img 
                                src={product.img} 
                                alt={product.name}
                                className="img-fluid rounded shadow-lg"
                                style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                            />
                            {product.sale_price > 0 && (
                                <Badge bg="danger" className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow">
                                    GIẢM GIÁ
                                </Badge>
                            )}
                        </div>
                    </div>
                </Col>

                {/* Cột bên phải: Nội dung chi tiết */}
                <Col md={7} lg={8}>
                    <div className="bg-secondary rounded p-4 h-100 shadow-sm text-start">
                        {/* Danh mục sản phẩm */}
                        <div className="mb-2 d-flex align-items-center justify-content-between">
                            <span className="text-danger-custom fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                                <FaTags className="me-1" /> {product.category}
                            </span>
                            <Badge bg={product.status === 1 ? "success" : "danger"} className="rounded-pill px-3">
                                {product.status === 1 ? <><FaCheckCircle className="me-1"/> Còn hàng</> : <><FaTimesCircle className="me-1"/> Hết hàng</>}
                            </Badge>
                        </div>

                        <h2 className="mb-3 text-white fw-bold">
                            {product.name}
                        </h2>

                        {/* Phần hiển thị Giá */}
                        <div className="d-flex align-items-baseline gap-3 mb-4 mt-3">
                            {product.sale_price > 0 ? (
                                <>
                                    <h3 className="text-danger-custom fw-bold mb-0">{product.sale_price} VND</h3>
                                    <h5 className="text-white text-decoration-line-through mb-0">{product.price} VND</h5>
                                </>
                            ) : (
                                <h3 className="text-white fw-bold mb-0">{product.price} VND</h3>
                            )}
                        </div>

                        {/* Thông tin ID sản phẩm (Dành cho Admin) */}
                        <div className="mt-4">
                            <small className="small text-white">Mã sản phẩm: <span className='text-danger fw-bolder'>#PROD-{product.id}</span></small>
                        </div>

                        <hr className="border-dark opacity-25" />

                        {/* Thông tin mô tả */}
                        <div className="product-info mt-4">
                            <h5 className="text-white mb-3 d-flex align-items-center">
                                <FaBoxes className="me-2 text-danger-custom" /> Mô tả chi tiết
                            </h5>
                            <div 
                                className="text-light-gray"
                                style={{ fontSize: '1.05rem', lineHeight: '1.7' }}
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                            />
                        </div>

                        {/* Thanh hành động (Sửa/Trở về) */}
                        <div className="mt-5 pt-4 border-top border-dark d-flex flex-wrap gap-3">
                            <Button variant="warning" className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center">
                                <FaEdit className="me-2" /> Chỉnh sửa thông tin
                            </Button>
                            <Button as={Link} to='/admin/productAdmin' variant="outline-light" className="rounded-pill px-4 d-flex align-items-center">
                                <FaArrowLeft className="me-2" /> Quay lại danh sách
                            </Button>
                        </div>
                        
                        
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;