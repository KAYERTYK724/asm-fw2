import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Thêm useParams
import { Container, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { FaEdit, FaArrowLeft, FaTags, FaBoxes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './style.css';
import requestAPI from "../../../../RequestAPI"; // Đảm bảo đường dẫn đúng với project của bạn

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL (ví dụ: /admin/viewProduct/1)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const res = await requestAPI({
                    method: "GET",
                    url: `/products/${id}`, // Endpoint lấy chi tiết theo ID
                });
                setProduct(res.data.data);
            } catch (error) {
                console.error("Lỗi lấy chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProductDetail();
    }, [id]);

    // Hiển thị loading khi đang lấy dữ liệu
    if (loading) {
        return (
            <Container className="text-center pt-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-white mt-2">Đang tải chi tiết sản phẩm...</p>
            </Container>
        );
    }

    // Trường hợp không tìm thấy sản phẩm
    if (!product) {
        return (
            <Container className="text-center pt-5">
                <h3 className="text-white">Không tìm thấy sản phẩm!</h3>
                <Button as={Link} to='/admin/productAdmin' variant="outline-light" className="mt-3">
                    Quay lại danh sách
                </Button>
            </Container>
        );
    }

    const formatVND = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <Container fluid className="pt-4 px-4 detail-product-container">
            <Row className="g-4">
                {/* Cột bên trái: Hình ảnh sản phẩm */}
                <Col md={5} lg={4}>
                    <div className="bg-secondary rounded p-4 h-100 text-center border-0 shadow-sm position-relative">
                        <div className="sticky-top" style={{ top: '25px', zIndex: 1 }}>
                            <img 
                                src={product.image || product.img} // Hỗ trợ cả 2 field name tùy API
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
                        <div className="mb-2 d-flex align-items-center justify-content-between">
                            <span className="text-danger-custom fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                                <FaTags className="me-1" /> {product.category?.name || product.category}
                            </span>
                            <Badge bg={product.status === 1 ? "success" : "danger"} className="rounded-pill px-3">
                                {product.status === 1 ? <><FaCheckCircle className="me-1"/> Còn hàng</> : <><FaTimesCircle className="me-1"/> Hết hàng</>}
                            </Badge>
                        </div>

                        <h2 className="mb-3 text-white fw-bold">{product.name}</h2>

                        {/* Phần hiển thị Giá */}
                        <div className="d-flex align-items-baseline gap-3 mb-4 mt-3">
                            {product.sale_price > 0 ? (
                                <>
                                    <h3 className="text-danger-custom fw-bold mb-0">{formatVND(product.sale_price)}</h3>
                                    <h5 className="text-white text-decoration-line-through mb-0 opacity-50">{formatVND(product.price)}</h5>
                                </>
                            ) : (
                                <h3 className="text-white fw-bold mb-0">{formatVND(product.price)}</h3>
                            )}
                        </div>

                        <div className="mt-4">
                            <small className="small text-white opacity-75">Mã sản phẩm: <span className='text-danger fw-bolder'>#PROD-{product.id}</span></small>
                        </div>

                        <hr className="border-dark opacity-25" />

                        {/* Thông tin mô tả */}
                        <div className="product-info mt-4">
                            <h5 className="text-white mb-3 d-flex align-items-center">
                                <FaBoxes className="me-2 text-danger-custom" /> Mô tả chi tiết
                            </h5>
                            <div 
                                className="text-light-gray"
                                style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#adb5bd' }}
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                            />
                        </div>

                        {/* Thanh hành động */}
                        <div className="mt-5 pt-4 border-top border-dark d-flex flex-wrap gap-3">
                            <Button 
                                as={Link} 
                                to={`/admin/editProduct/${product.id}`} 
                                variant="warning" 
                                className="rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center"
                            >
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