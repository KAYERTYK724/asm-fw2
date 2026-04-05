import './style.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      {/* FOOTER */}
      <footer className='footer'>
        <Container>
          <Row>
            {/* CỘT 1 */}
            <Col lg={3} md={6}>
              <div className='footer-about'>
                <h3 className='logo'>
                  <span className='text-danger'>Male </span>fashion<span>.</span>
                </h3>
                <p className='text-danger'>
                  Khách hàng là trung tâm trong mô hình kinh doanh của chúng tôi, bao gồm cả
                  thiết kế.
                </p>
                <div className='payment'>
                  <img src='img/payment.png' alt='' />
                </div>
              </div>
            </Col>

            {/* CỘT 2 */}
            <Col lg={2} md={6}>
              <div className='footer-widget'>
                <h6>Mua sắm</h6>
                <ul>
                  <li>Quần áo</li>
                  <li>Giày xu hướng</li>
                  <li>Phụ kiện</li>
                  <li>Giảm giá</li>
                </ul>
              </div>
            </Col>

            {/* CỘT 3 */}
            <Col lg={2} md={6}>
              <div className='footer-widget'>
                <h6>Hỗ trợ</h6>
                <ul>
                  <li>Liên hệ</li>
                  <li>Phương thức thanh toán</li>
                  <li>Vận chuyển</li>
                  <li>Đổi trả</li>
                </ul>
              </div>
            </Col>

            {/* CỘT 4 */}
            <Col lg={4} md={6} className='offset-lg-1'>
              <div className='footer-widget'>
                <h6>Bản tin</h6>
                <p>Nhận thông tin về sản phẩm mới, bộ sưu tập và ưu đãi mới nhất!</p>

                <Form className='newsletter-form'>
                  <Form.Control type='email' placeholder='Nhập email của bạn' />
                  <button type='submit'>
                    <FaEnvelope />
                  </button>
                </Form>
              </div>
            </Col>
          </Row>

          {/* COPYRIGHT */}
          <Row>
            <Col lg={12}>
              <div className='footer-bottom text-center'>
                © {new Date().getFullYear()} Bản quyền thuộc về bạn
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
