import './style.css';
import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
  Pagination,
} from 'react-bootstrap';

const Product = () => {
  const allKeys = ['0', '1', '2', '3', '4', '5'];
  const products = [
    {
      id: 1,
      name: 'Áo khoác Biker Piqué',
      price: 67.24,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 2,
      name: 'Túi đeo ngực nhiều ngăn',
      price: 43.48,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
      sale: true,
    },
    {
      id: 3,
      name: 'Nón họa tiết chéo',
      price: 60.9,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 4,
      name: 'Boot cổ ngắn',
      price: 98.49,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
      sale: true,
    },
    {
      id: 5,
      name: 'Áo thun túi phối',
      price: 49.66,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 6,
      name: 'Khăn choàng basic',
      price: 26.28,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 1,
      name: 'Áo khoác Biker Piqué',
      price: 67.24,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 2,
      name: 'Túi đeo ngực nhiều ngăn',
      price: 43.48,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
      sale: true,
    },
    {
      id: 3,
      name: 'Nón họa tiết chéo',
      price: 60.9,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 4,
      name: 'Boot cổ ngắn',
      price: 98.49,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
      sale: true,
    },
    {
      id: 5,
      name: 'Áo thun túi phối',
      price: 49.66,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      id: 6,
      name: 'Khăn choàng basic',
      price: 26.28,
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    }
  ];
  return (
    <div>
      {/* Breadcrumb */}
      <div className='breadcrumb-section'>
        <Container>
          <h4>Cửa hàng</h4>
          <p>Trang chủ / Cửa hàng</p>
        </Container>
      </div>

      <Container className='mt-4'>
        <Row>
          {/* Sidebar */}
          <Col lg={3}>
            <div className='sidebar-container'>
              {/* THANH TÌM KIẾM */}
              <div className='search-section'>
                <div className='search-wrapper'>
                  <Form.Control
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='search-input'
                  />
                  <i className='bi bi-search search-icon'></i>{' '}
                  {/* Sử dụng bootstrap icons hoặc emoji */}
                  <span className='search-emoji'>🔍</span>
                </div>
              </div>

              {/* Cấu hình alwaysOpen để mở nhiều mục cùng lúc */}
              <Accordion defaultActiveKey={allKeys} alwaysOpen>
                {/* DANH MỤC */}
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>DANH MỤC</Accordion.Header>
                  <Accordion.Body>
                    <ul className='filter-list'>
                      <li>Nam (20)</li>
                      <li>Nữ (20)</li>
                      <li>Túi xách (20)</li>
                      <li>Quần áo (20)</li>
                      <li>Giày dép (20)</li>
                      <li>Phụ kiện (20)</li>
                      <li>Trẻ em (20)</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                {/* THƯƠNG HIỆU */}
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>THƯƠNG HIỆU</Accordion.Header>
                  <Accordion.Body>
                    <ul className='filter-list'>
                      <li>Louis Vuitton</li>
                      <li>Chanel</li>
                      <li>Hermes</li>
                      <li>Gucci</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                {/* LỌC GIÁ */}
                <Accordion.Item eventKey='2'>
                  <Accordion.Header>LỌC GIÁ</Accordion.Header>
                  <Accordion.Body>
                    <ul className='filter-list price-list'>
                      <li>$0.00 - $50.00</li>
                      <li>$50.00 - $100.00</li>
                      <li>$100.00 - $150.00</li>
                      <li>$150.00 - $200.00</li>
                      <li>$200.00 - $250.00</li>
                      <li>$250.00+</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                {/* KÍCH THƯỚC */}
                <Accordion.Item eventKey='3'>
                  <Accordion.Header>KÍCH THƯỚC</Accordion.Header>
                  <Accordion.Body>
                    <div className='size-grid'>
                      {['XS', 'S', 'M', 'XL', '2XL', 'XXL', '3XL', '4XL'].map((size) => (
                        <div key={size} className='size-item'>
                          {size}
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                {/* MÀU SẮC */}
                <Accordion.Item eventKey='4'>
                  <Accordion.Header>MÀU SẮC</Accordion.Header>
                  <Accordion.Body>
                    <div className='color-flex'>
                      <span className='color-circle black'></span>
                      <span className='color-circle navy'></span>
                      <span className='color-circle orange'></span>
                      <span className='color-circle gray'></span>
                      <span className='color-circle olive'></span>
                      <span className='color-circle pink'></span>
                      <span className='color-circle lavender'></span>
                      <span className='color-circle red'></span>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                {/* TAGS */}
                <Accordion.Item eventKey='5'>
                  <Accordion.Header>TAGS</Accordion.Header>
                  <Accordion.Body>
                    <div className='tag-cloud'>
                      {[
                        'SẢN PHẨM',
                        'TÚI XÁCH',
                        'GIÀY DÉP',
                        'THỜI TRANG',
                        'QUẦN ÁO',
                        'MŨ NÓN',
                        'PHỤ KIỆN',
                      ].map((tag) => (
                        <span key={tag} className='tag-item'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>

          {/* Products */}
          <Col lg={9}>
            {/* GRID */}
            <Row>
              {products.map((item) => (
                <Col lg={4} md={6} key={item.id}>
                  <div className='product-item'>
                    {/* IMAGE */}
                    <div className='product-img'>
                      <img src={item.img} alt={item.name} />

                      {/* HOVER ADD TO CART */}
                      <div className='hover-cart'>+ Thêm vào giỏ hàng</div>
                    </div>

                    {/* TEXT */}
                    <div className='product-text'>
                      <h6>{item.name}</h6>
                      <h5>${item.price}</h5>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* PAGINATION */}
            <Pagination className='justify-content-center mt-4 custom-pagination'>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>21</Pagination.Item>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
