/* eslint-disable no-unused-vars */
import './style.css';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";
import requestAPI from '../../../RequestAPI';

const PageHome = () => {
  const [products, setProducts] = useState([]);

  //Gọi API Node.js
  useEffect(() => {
    const fetchProduct = async () => {
      const resProduct = await requestAPI({
        method: 'GET',
        url: '/products/list',
      });

      if (resProduct) setProducts(resProduct.data.data);
    };

    fetchProduct();
  }, []);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };


  return (
    <>
      {/* HERO */}
      <section className='hero'>
        <Container>
          <Row className='align-items-center'>
            <Col lg={5} md={6}>
              <div className='hero-text'>
                <span>Bộ sưu tập mùa hè</span>
                <h1>Bộ sưu tập Thu - Đông 2030</h1>
                <p>
                  Thương hiệu chuyên cung cấp các sản phẩm cao cấp. Được sản xuất với cam kết
                  chất lượng cao nhất.
                </p>

                <Button className='hero-btn rounded-0'>
                  Mua ngay <FaArrowRight />
                </Button>

                <div className='hero-social'>
                  <FaFacebookF />
                  <FaTwitter />
                  <FaInstagram />
                </div>
              </div>
            </Col>
          </Row>

          <div className='hero-arrow left'>
            <FaArrowLeft />
          </div>
          <div className='hero-arrow right'>
            <FaArrowRight />
          </div>
        </Container>
      </section>

      {/* BANNER */}
      <section className='banner-section py-5'>
        <Container>
          <Row className='g-4'>
            <Col md={6}>
              <Card className='banner-card rounded-0'>
                <Card.Img src='https://i.pinimg.com/736x/e3/4a/d5/e34ad5dad362d3ef63c5fa02d84c0a5a.jpg' className='rounded-0' />
                <Card.ImgOverlay className='banner-overlay'>
                  <h3>Bộ sưu tập quần áo 2030</h3>
                  <p className='shop-now'>Mua ngay</p>
                </Card.ImgOverlay>
              </Card>
            </Col>

            <Col md={6}>
              <Row className='g-4'>
                <Col md={12}>
                  <Card className='banner-card small rounded-0'>
                    <Card.Img src='https://i.pinimg.com/736x/39/a5/f8/39a5f84a68605f292bcf4f78a8e3097e.jpg' className='rounded-0' />
                    <Card.ImgOverlay className='banner-overlay'>
                      <h4>Phụ kiện</h4>
                      <p className='shop-now'>Mua ngay</p>
                    </Card.ImgOverlay>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card className='banner-card small rounded-0'>
                    <Card.Img src='https://i.pinimg.com/736x/b0/e0/e8/b0e0e876ca7b09f13f75295c51e84ed6.jpg' className='rounded-0' />
                    <Card.ImgOverlay className='banner-overlay'>
                      <h4>Giày xuân 2030</h4>
                      <p className='shop-now'>Mua ngay</p>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section className='product-section py-5'>
        <Container>
          <h2 className='text-center mb-5 text-h2'>Sản phẩm bán chạy</h2>

          <Row className='g-4'>
            {products.map((p) => (
              <Col lg={3} md={6} sm={6} key={p.id} className='mb-4'>
                <Link to={`/detailShop/${p.id}`} className='text-decoration-none text-black'>
                    <div className='product-card text-center position-relative'>
                      <div className='product-img mb-3 overflow-hidden position-relative'>
                        <img
                          src={p.image}
                          alt={p.name}
                          className='img-fluid w-100'
                          style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />
                        <div className='product-hover-overlay'>
                          <FaShoppingCart />
                        </div>
                      </div>
                      <h6 className='fw-bold'>{p.name}</h6>
                      <div>
                        {p.sale_price && p.sale_price > 0 ? (
                          <>
                            {/* Giá giảm */}
                            <p className='text-danger fw-bold mb-1'>
                              {formatVND(p.sale_price)}
                            </p>

                            {/* Giá gốc */}
                            <p
                              className='text-muted'
                              style={{ textDecoration: 'line-through', fontSize: '14px' }}
                            >
                              {formatVND(p.price)}
                            </p>
                          </>
                        ) : (
                          <p className='text-danger fw-bold'>
                            {formatVND(p.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      
      {/* (các phần dưới giữ nguyên) */}
    </>
  );
};

export default PageHome;