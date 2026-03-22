/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaQuoteLeft } from 'react-icons/fa';
import './style.css';

const BlogDetails = () => {
  return (
    <div className='blog-details-wrapper'>
      {/* Blog Details Hero - Phần tiêu đề bài viết */}
      <section className='blog-hero'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={9} className='text-center'>
              <div className='blog__hero__text'>
                <h2>
                  Bạn có nằm trong số hàng nghìn người sở hữu iPhone nhưng chưa biết điều này
                </h2>
                <ul className='list-inline'>
                  <li className='list-inline-item'>Bởi Deercreative</li>
                  <li className='list-inline-item'>21 Tháng 2, 2019</li>
                  <li className='list-inline-item'>8 Bình luận</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blog Details Content Section */}
      <section className='blog-details spad'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12} className='mb-5'>
              <div className='blog__details__pic text-center'>
                <img
                  src='https://i.pinimg.com/736x/ca/19/05/ca19054b7037d53e316afb08b45b5440.jpg'
                  alt='Blog Main'
                  className='img-fluid'
                />
              </div>
            </Col>

            <Col lg={8}>
              <div className='blog__details__content'>
                {/* Chia sẻ mạng xã hội bên trái (Sticky desktop) */}
                <div className='blog__details__share'>
                  <span>Chia sẻ</span>
                  <ul>
                    <li>
                      <a href='#' className='facebook'>
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='twitter'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='youtube'>
                        <FaYoutube />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='linkedin'>
                        <FaLinkedinIn />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='blog__details__text'>
                  <p>
                    Hydroderm là loại kem chống lão hóa được khao khát nhất hiện nay. Loại huyết
                    thanh này hạn chế sự xuất hiện của các dấu hiệu lão hóa sớm trên da và giữ
                    cho làn da trẻ trung, săn chắc và khỏe mạnh hơn. Nó làm giảm các nếp nhăn và
                    tình trạng chảy xệ của da. Kem dưỡng này nuôi dưỡng làn da và mang lại vẻ
                    rạng rỡ vốn đã mất đi trong những năm tháng bận rộn.
                  </p>
                  <p>
                    Thành phần thiết yếu nhất làm cho hydroderm hiệu quả đến vậy là Vyo-Serum,
                    một sản phẩm từ các protein tự nhiên được lựa chọn. Tinh chất này hoạt động
                    tích cực trong việc mang lại vẻ rạng rỡ trẻ trung tự nhiên cho làn da. Nó
                    làm săn chắc da cùng với hiệu quả dưỡng ẩm. Thành phần quan trọng khác là
                    "collagen biển", kết hợp với Vyo-Serum giúp tái tạo làn da.
                  </p>
                </div>

                {/* Phần trích dẫn */}
                <div className='blog__details__quote'>
                  <FaQuoteLeft className='quote-icon' />
                  <p>
                    “Khi thiết kế quảng cáo cho một sản phẩm cụ thể, nhiều thứ cần được nghiên
                    cứu kỹ lưỡng như nơi nó nên được hiển thị.”
                  </p>
                  <h6>_ John Smith _</h6>
                </div>

                <div className='blog__details__text'>
                  <p>
                    Vyo-Serum cùng với việc làm săn chắc da cũng làm giảm các đường nhăn dấu
                    hiệu lão hóa. Các vấn đề như quầng thâm, bọng mắt và vết chân chim có thể
                    được kiểm soát từ tác dụng mạnh mẽ của loại huyết thanh này.
                  </p>
                  <p>
                    Hydroderm là một sản phẩm đa năng giúp giảm mỡ thừa và mang lại cho cơ thể
                    một vóc dáng thon gọn, cũng giúp làm sạch da từ gốc và không để lỗ chân lông
                    bị tắc nghẽn, đồng thời quét sạch các nếp nhăn vùng nhạy cảm gần mắt.
                  </p>
                </div>

                {/* Tags và Tác giả */}
                <div className='blog__details__option'>
                  <Row>
                    <Col sm={6}>
                      <div className='blog__details__author d-flex align-items-center'>
                        <div className='blog__details__author__pic'>
                          <img
                            src='https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg'
                            alt='Author'
                            className='rounded-circle'
                          />
                        </div>
                        <div className='blog__details__author__text ms-3'>
                          <h5>Aiden Blair</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6} className='text-sm-end text-start mt-3 mt-sm-0'>
                      <div className='blog__details__tags'>
                        <a href='#'>#Thờitrang</a> <a href='#'>#Xuhướng</a>{' '}
                        <a href='#'>#2020</a>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Điều hướng bài viết */}
                <div className='blog__details__btns border-top border-bottom py-4 my-4'>
                  <Row>
                    <Col xs={6}>
                      <a href='#' className='blog__details__btns__item text-decoration-none'>
                        <p className='mb-1 text-muted'>← Bài trước</p>
                        <h6 className='text-dark'>
                          Cách sử dụng các trang quảng cáo miễn phí hiệu quả
                        </h6>
                      </a>
                    </Col>
                    <Col xs={6} className='text-end border-start'>
                      <a href='#' className='blog__details__btns__item text-decoration-none'>
                        <p className='mb-1 text-muted'>Bài kế tiếp →</p>
                        <h6 className='text-dark'>
                          Mẹo chọn loại son bóng hoàn hảo cho đôi môi của bạn
                        </h6>
                      </a>
                    </Col>
                  </Row>
                </div>

                {/* Form bình luận */}
                <div className='blog__details__comment'>
                  <h4 className='mb-4'>Để lại bình luận</h4>
                  <Form>
                    <Row className='g-3'>
                      <Col md={4}>
                        <Form.Control
                          type='text'
                          placeholder='Họ tên'
                          className='custom-input'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          type='email'
                          placeholder='Email'
                          className='custom-input'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          type='text'
                          placeholder='Số điện thoại'
                          className='custom-input'
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          placeholder='Bình luận của bạn'
                          className='custom-input'
                        />
                      </Col>
                      <Col xs={12} className='text-center mt-4'>
                        <Button variant='dark' type='submit' className='site-btn px-5 py-3'>
                          Gửi bình luận
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BlogDetails;
