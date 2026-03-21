import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Breadcrumb, Button } from 'react-bootstrap';
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import './style.css';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XL');

  const relatedProducts = [
    {
      id: 1,
      name: 'Áo Khoác Biker Piqué',
      price: '$67.24',
      status: 'Mới',
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 2,
      name: 'Áo Khoác Slim Jacket',
      price: '$67.24',
      status: null,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 3,
      name: 'Túi Đeo Ngực Nhiều Ngăn',
      price: '$43.48',
      status: 'Giảm giá',
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 4,
      name: 'Mũ Lưỡi Trai Gân Chéo',
      price: '$60.9',
      status: null,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
  ];

  return (
    <section className='shop-details py-5'>
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
              <Col lg={1} md={2} className='p-0'>
                <Nav variant='tabs' className='product__thumb__nav flex-column border-0'>
                  <Nav.Item>
                    <Nav.Link eventKey='thumb-1' className='p-0 mb-3 border-0'>
                      <div className='thumb-item'>
                        <img
                          src='https://i.pinimg.com/1200x/a6/85/93/a68593220d20e4a56bc50c88688bd1d8.jpg'
                          alt='thumb 1'
                          className='img-fluid'
                        />
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='thumb-2' className='p-0 mb-3 border-0'>
                      <div className='thumb-item'>
                        <img
                          src='https://i.pinimg.com/1200x/a4/38/c5/a438c5eacc99cb7f9828e0f68ec6ebf3.jpg'
                          alt='thumb 2'
                          className='img-fluid'
                        />
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='thumb-3' className='p-0 mb-3 border-0'>
                      <div className='thumb-item'>
                        <img
                          src='https://i.pinimg.com/1200x/a6/85/93/a68593220d20e4a56bc50c88688bd1d8.jpg'
                          alt='thumb 3'
                          className='img-fluid'
                        />
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col lg={5} md={8}>
                <Tab.Content className='product__big__img border-0'>
                  <Tab.Pane eventKey='thumb-1'>
                    <img
                      src='https://i.pinimg.com/1200x/a6/85/93/a68593220d20e4a56bc50c88688bd1d8.jpg'
                      alt='Sản phẩm lớn 1'
                      className='img-fluid w-100'
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey='thumb-2'>
                    <img
                      src='https://i.pinimg.com/1200x/a4/38/c5/a438c5eacc99cb7f9828e0f68ec6ebf3.jpg'
                      alt='Sản phẩm lớn 2'
                      className='img-fluid w-100'
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey='thumb-3'>
                    <img
                      src='https://i.pinimg.com/1200x/a6/85/93/a68593220d20e4a56bc50c88688bd1d8.jpg'
                      alt='Sản phẩm lớn 3'
                      className='img-fluid w-100'
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>

        {/* Nội dung chi tiết */}
        <Row className='justify-content-center text-center'>
          <Col lg={8}>
            <div className='product__details__text'>
              <h4 className='fw-bold mb-2'>Áo khoác Anorak nhiệt có mũ</h4>

              <div className='rating mb-2'>
                <FaStar className='star-active' />
                <FaStar className='star-active' />
                <FaStar className='star-active' />
                <FaStar className='star-active' />
                <FaRegStar className='star-inactive' />
                <span className='ms-2 text-muted'>- 5 Đánh giá</span>
              </div>

              <h3 className='price-detail mb-4'>
                $270.00 <span className='old-price'>$370.00</span>
              </h3>

              <div className='product__options mb-4'>
                {/* Chọn kích thước */}
                <div className='option-item d-flex justify-content-center align-items-center mb-4'>
                  <span className='option-label'>Kích thước:</span>
                  <div className='size-selector d-flex gap-2'>
                    {['XXL', 'XL', 'L', 'S'].map((size) => (
                      <div
                        key={size}
                        className={`size-item ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chọn màu sắc */}
                <div className='option-item d-flex justify-content-center align-items-center mb-4'>
                  <span className='option-label'>Màu sắc:</span>
                  <div className='color-selector d-flex gap-2'>
                    <div className='color-dot bg-black active'></div>
                    <div className='color-dot bg-navy'></div>
                    <div className='color-dot bg-orange'></div>
                    <div className='color-dot bg-red'></div>
                    <div className='color-dot bg-white border'></div>
                  </div>
                </div>

                <div className='product-meta mt-4 text-muted small'>
                  <div className='mb-1'>
                    Mã hàng (SKU): <strong>3812912</strong>
                  </div>
                  <div>
                    Danh mục: <strong>Quần áo</strong>
                  </div>
                </div>

                {/* Số lượng và Nút mua hàng */}
                <div className='cart__action d-flex justify-content-center gap-3 align-items-center mb-4'>
                  <div className='quantity-control border d-flex align-items-center'>
                    <input
                      type='text'
                      value={quantity}
                      readOnly
                      className='qty-input text-center'
                    />
                    <div className='qty-btns d-flex flex-column border-start'>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='border-0 bg-transparent'
                      >
                        ^
                      </button>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className='border-0 bg-transparent'
                      >
                        v
                      </button>
                    </div>
                  </div>
                  <Button variant='dark' className='add-to-cart-btn px-5 text-uppercase'>
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
                  <div className='product__details__tab__desc'>
                    <p className='main-intro'>
                      Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud
                      felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut
                      risus. Sedcus faucibus an ullamcorper mattis drostique des commodo
                      pharetras loremos.
                    </p>
                    <h6>Thông tin sản phẩm</h6>
                    <p>
                      Một chiếc Pocket PC là một máy tính cầm tay, có nhiều tính năng tương tự
                      như một chiếc PC hiện đại. Những thiết bị nhỏ gọn tiện dụng này cho phép
                      cá nhân truy xuất và lưu trữ thư điện tử, tạo tệp danh bạ, điều phối cuộc
                      hẹn, lướt internet, trao đổi tin nhắn văn bản và nhiều hơn nữa. Mọi sản
                      phẩm được dán nhãn là Pocket PC phải đi kèm với phần mềm cụ thể để vận
                      hành thiết bị và phải có màn hình cảm ứng cùng bàn di chuột.
                    </p>
                    <h6>Chất liệu sử dụng</h6>
                    <p>
                      Polyester được coi là có chất lượng thấp hơn do đặc tính không tự nhiên
                      của nó. Được làm từ vật liệu tổng hợp, không tự nhiên như len. Bộ vest
                      polyester dễ bị nhăn và được biết đến là không thoáng khí. Polyester có xu
                      hướng sáng bóng hơn so với len và cotton, điều này có thể làm cho bộ vest
                      trông rẻ tiền. Tuy nhiên, kết cấu của nhung rất sang trọng và thoáng khí.
                    </p>
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
        <div className='related-section mt-5 pt-5'>
          <h3 className='text-center fw-bold mb-5'>Sản phẩm liên quan</h3>
          <Row>
            {relatedProducts.map((item) => (
              <Col lg={3} md={6} sm={6} key={item.id} className='mb-4'>
                <div className='product-card text-center position-relative'>
                  <div className='product-img mb-3 overflow-hidden position-relative'>
                    <img src={item.img} alt={item.name} className='img-fluid w-100' />
                    <div className='product-hover-overlay'>
                      <FaShoppingCart />
                    </div>
                  </div>
                  <h6 className='fw-bold'>{item.name}</h6>
                  <p className='text-danger fw-bold'>{item.price}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
