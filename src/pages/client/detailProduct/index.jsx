import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Nav, Tab, Breadcrumb, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import requestAPI from '../../../RequestAPI';
import './style.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const resProduct = await requestAPI({
          method: 'GET',
          url: `/products/${id}`,
        });

        setProduct(resProduct.data.data);
      } catch (error) {
        console.log('Lỗi API:', error);
      }
    };

    fetchDetailProduct();
  }, [id]);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

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
              <Breadcrumb.Item href='#'>Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item href='#'>Cửa hàng</Breadcrumb.Item>
              <Breadcrumb.Item active>Chi tiết sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </section>

      <Container>
        {/* Product Image Gallery Section */}
        <Container className='mt-5'>
          <Tab.Container defaultActiveKey='thumb-1'>
            <Row className='justify-content-center'>
              <Col lg={5} md={8}>
                <Tab.Content className='product__big__img border-0'>
                  <Tab.Pane eventKey='thumb-1'>
                    <img src={product.image} alt='Sản phẩm lớn 1' className='img-fluid w-100' 
                    style={{height: '490px', objectFit: 'cover'}}/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>

        {/* Nội dung chi tiết */}
        <Row className='justify-content-center text-center m-5'>
          <Col lg={8}>
            <div className='product__details__text'>
              <h4 className='fw-bold mb-2'>{product.name}</h4>

              <h3 className='price-detail mb-2'>
                {product.sale_price && product.sale_price > 0 ? (
                  <>
                    {formatVND(product.sale_price)}{' '}
                    <span className='old-price'>{formatVND(product.price)}</span>
                  </>
                ) : (
                  formatVND(product.price)
                )}
              </h3>

              <div className='product__options mb-4'>
                <div className='product-meta text-muted small'>
                  <div className='fw-bolder fs-6'>
                    DANH MỤC: <span>{product.category?.name}</span>
                  </div>
                </div>

                {/* Số lượng và Nút mua hàng */}
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
                    className='add-to-cart-btn px-5 text-uppercase rounded-0'
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
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

        {/* Sản phẩm liên quan */}

        {/* Sản phẩm liên quan */}
        <div className='related-section mt-5 pt-5'>
          <h3 className='text-center fw-bold mb-5'>Sản phẩm liên quan</h3>

          <Row>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Col lg={3} md={6} sm={6} key={item.id} className='mb-4'>
                  <div className='product-card text-center position-relative'>
                    <div className='product-img mb-3 overflow-hidden position-relative'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid w-100'
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                      <div className='product-hover-overlay'>
                        <FaShoppingCart />
                      </div>
                    </div>

                    <h6 className='fw-bold'>{item.name}</h6>

                    <p className='text-danger fw-bold'>
                      {item.sale_price && item.sale_price > 0 ? (
                        <>
                          {formatVND(item.sale_price)}{' '}
                          <span className='old-price'>{formatVND(item.price)}</span>
                        </>
                      ) : (
                        formatVND(item.price)
                      )}
                    </p>
                  </div>
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
