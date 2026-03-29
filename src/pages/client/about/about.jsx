import React from "react";
import "./style.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <div className="overlay">
          <h1>MENDOVER FASHION</h1>
          <p>Phong cách của bạn - Cá tính của bạn</p>
          <Button variant="light">Khám phá bộ sưu tập</Button>
        </div>
      </div>

      <Container>

        {/* INTRO */}
        <Row className="align-items-center section">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
              className="img-fluid rounded"
              alt=""
            />
          </Col>
          <Col md={6}>
            <h2>Về Mendover</h2>
            <p>
              Mendover là thương hiệu thời trang chuyên cung cấp quần áo, áo thun,
              hoodie và phụ kiện dành cho giới trẻ yêu thích phong cách hiện đại.
            </p>
            <p>
              Chúng tôi mang đến những sản phẩm chất lượng cao, thiết kế tinh tế
              và luôn bắt kịp xu hướng mới nhất trên thị trường.
            </p>
          </Col>
        </Row>

        {/* MISSION */}
        <Row className="align-items-center section flex-md-row-reverse">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
              className="img-fluid rounded"
              alt=""
            />
          </Col>
          <Col md={6}>
            <h2>Sứ mệnh</h2>
            <p>
              Mendover mong muốn giúp bạn tự tin thể hiện cá tính thông qua thời
              trang. Chúng tôi tin rằng mỗi bộ trang phục đều kể một câu chuyện.
            </p>
            <p>
              Không chỉ là quần áo, chúng tôi mang đến phong cách sống và sự tự tin.
            </p>
          </Col>
        </Row>

        {/* VALUES */}
        <Row className="text-center section">
          <h2 className="mb-4">Tại sao chọn chúng tôi?</h2>

          <Col md={4}>
            <div className="value-box">
              <h4>👕 Chất lượng</h4>
              <p>Vải cao cấp, đường may chắc chắn</p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-box">
              <h4>🔥 Xu hướng</h4>
              <p>Thiết kế luôn cập nhật trend mới</p>
            </div>
          </Col>

          <Col md={4}>
            <div className="value-box">
              <h4>🚚 Giao hàng</h4>
              <p>Ship toàn quốc nhanh chóng</p>
            </div>
          </Col>
        </Row>

        {/* STATS */}
        <Row className="text-center stats section">
          <Col md={3}>
            <h3>15K+</h3>
            <p>Khách hàng</p>
          </Col>
          <Col md={3}>
            <h3>800+</h3>
            <p>Sản phẩm</p>
          </Col>
          <Col md={3}>
            <h3>7+</h3>
            <p>Năm kinh nghiệm</p>
          </Col>
          <Col md={3}>
            <h3>98%</h3>
            <p>Hài lòng</p>
          </Col>
        </Row>

        {/* CTA */}
        <div className="about-cta text-center">
          <h2>Mua sắm ngay hôm nay</h2>
          <p>Khám phá bộ sưu tập thời trang mới nhất</p>
          <Button variant="dark">Xem sản phẩm</Button>
        </div>

      </Container>
    </div>
  );
};

export default About;