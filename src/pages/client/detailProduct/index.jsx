import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Tab, Breadcrumb, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import requestAPI from '../../../RequestAPI';
import './style.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ load sản phẩm
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const res = await requestAPI({
          method: 'GET',
          url: `/products/${id}`,
        });

        setProduct(res.data.data);
      } catch (error) {
        console.log('Lỗi API:', error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  // ✅ format tiền
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // ✅ load sản phẩm liên quan
  useEffect(() => {
    if (product?.category_id) {
      const fetchRelated = async () => {
        try {
          const res = await requestAPI({
            method: 'GET',
            url: `/products/list?categoryId=${product.category_id}`,
          });

          const filtered = res.data.data.filter((item) => item.id !== product.id);

          setRelatedProducts(filtered);
        } catch (error) {
          console.log('Lỗi related:', error);
        }
      };

      fetchRelated();
    }
  }, [product]);

  // ✅ add to cart chuẩn
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      // ❌ chưa login
      if (!token || !user) {
        alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
        navigate('/login');
        return;
      }

      setLoading(true);

      await requestAPI({
        method: 'POST',
        url: '/orders/add-to-cart',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: user.id, // ✅ BẮT BUỘC
          product_id: product.id,
          quantity: Number(quantity) || 1, // ✅ ép số
        },
      });

      alert('✅ Thêm vào giỏ hàng thành công!');
      navigate('/cart');
    } catch (error) {
      console.log('Lỗi add to cart:', error);

      if (error.response?.status === 401) {
        alert('Phiên đăng nhập hết hạn!');
        navigate('/login');
      } else {
        alert('❌ Thêm thất bại!');
      }
    } finally {
      setLoading(false);
    }
  };

  // ❌ chưa load xong
  if (!product) {
    return <p className='text-center mt-5'>Đang tải sản phẩm...</p>;
  }

  return (
    <section className='shop-details'>
      {/* Breadcrumb */}
      <section className='breadcrumb-section-details'>
        <Row className='m-0'>
          <Col lg={12} className='d-flex justify-content-center'>
            <Breadcrumb className='product_details_breadcrumb'>
              <Breadcrumb.Item onClick={() => navigate('/')}>Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => navigate('/shop')}>Cửa hàng</Breadcrumb.Item>
              <Breadcrumb.Item active>Chi tiết sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </section>

      <Container>
        {/* IMAGE */}
        <Container className='mt-5'>
          <Row className='justify-content-center'>
            <Col lg={5} md={8}>
              <img
                src={product.image}
                alt={product.name}
                className='img-fluid w-100'
                style={{ height: '490px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>

        {/* INFO */}
        <Row className='justify-content-center text-center m-5'>
          <Col lg={8}>
            <div className='product__details__text'>
              <h4 className='fw-bold mb-2'>{product.name}</h4>

              <h3 className='price-detail mb-2'>
                {product.sale_price > 0 ? (
                  <>
                    {formatVND(product.sale_price)}{' '}
                    <span className='old-price'>{formatVND(product.price)}</span>
                  </>
                ) : (
                  formatVND(product.price)
                )}
              </h3>

              <div className='fw-bolder fs-6 mb-3'>
                DANH MỤC: <span>{product.category?.name}</span>
              </div>

              {/* QUANTITY + CART */}
              <div className='cart__action d-flex justify-content-center gap-3 align-items-center mb-4'>
                <div className='quantity-control'>
                  <input
                    type='text'
                    value={quantity}
                    readOnly
                    className='qty-input rounded-0'
                  />
                  <div className='qty-btns'>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  </div>
                </div>

                <Button
                  variant='dark'
                  className='px-5 text-uppercase rounded-0'
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  {loading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Tabs Thông tin bổ sung */}
        <Row className='mt-5'>
          <Col lg={12}>
            <Tab.Container defaultActiveKey='desc'>
              <Nav
                variant='tabs'
                className='justify-content-center border-0 mb-5 custom-product-tabs'
              >
                <Nav.Item>
                  <Nav.Link eventKey='desc' className='border-0'>
                    Mô tả
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='review' className='border-0'>
                    Khách hàng xem trước (5)
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className='product__details__tab__content'>
                <Tab.Pane eventKey='desc'>
                  <div className='product__details__tab__desc'
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  >
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='review'>
                  <div className='product__details__tab__desc text-center'>
                    <p>Nội dung đánh giá của khách hàng đang được tải...</p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>

        {/* RELATED */}
        <div className='mt-5 pt-5'>
          <h3 className='text-center fw-bold mb-5'>Sản phẩm liên quan</h3>

          <Row>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Col lg={3} md={6} sm={6} key={item.id} className='mb-4'>
                  <Link to={`/detailShop/${item.id}`} className='text-decoration-none text-black'>
                    <div className='product-card text-center position-relative'>
                      <div className='product-img mb-3 overflow-hidden position-relative'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='img-fluid w-100'
                          style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />
                        <div className='product-hover-overlay'>
                          <FaShoppingCart />
                        </div>
                      </div>
                      <h6 className='fw-bold'>{item.name}</h6>
                      <div>
                        {item.sale_price && item.sale_price > 0 ? (
                          <>
                            {/* Giá giảm */}
                            <p className='text-danger fw-bold mb-1'>
                              {formatVND(item.sale_price)}
                            </p>

                            {/* Giá gốc */}
                            <p
                              className='text-muted'
                              style={{ textDecoration: 'line-through', fontSize: '14px' }}
                            >
                              {formatVND(item.price)}
                            </p>
                          </>
                        ) : (
                          <p className='text-danger fw-bold'>
                            {formatVND(item.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </Col>
              ))
            ) : (
              <p className='text-center'>Không có sản phẩm liên quan</p>
            )}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
