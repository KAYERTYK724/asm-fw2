import './style.css';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Accordion, Pagination } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import requestAPI from '../../../RequestAPI';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const allKeys = ['0', '1', '2', '3', '4', '5'];
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const resCategory = await requestAPI({
        method: 'GET',
        url: '/categories/list',
      });

      if (resCategory) setCategories(resCategory.data.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = '/products/list';

      // nếu có chọn danh mục → thêm query
      if (selectedCategory) {
        url = `/products/list?categoryId=${selectedCategory}`;
      }

      const resProduct = await requestAPI({
        method: 'GET',
        url,
      });

      if (resProduct) setProducts(resProduct.data.data);
    };

    fetchProducts();
  }, [selectedCategory]);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

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
                  {/* Sử dụng bootstrap icons hoặc emoji */}
                  <span className='search-emoji'>
                    <FaSearch />
                  </span>
                </div>
              </div>

              {/* Cấu hình alwaysOpen để mở nhiều mục cùng lúc */}
              <Accordion defaultActiveKey={allKeys} alwaysOpen>
                {/* DANH MỤC */}
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>DANH MỤC</Accordion.Header>
                  <Accordion.Body>
                    <ul className='filter-list'>
                      <li onClick={() => setSelectedCategory(null)}>Tất cả</li>

                      {categories.map((c) => (
                        <li
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id)}
                          style={{
                            cursor: 'pointer',
                            fontWeight: selectedCategory === c.id ? 'bold' : 'normal',
                            color: selectedCategory === c.id ? 'red' : '',
                          }}
                        >
                          {c.name}
                        </li>
                      ))}
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
            <Row>
              {products.map((item) => (
                <Col lg={4} md={6} key={item.id} className='mb-4'>
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
              ))}
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
