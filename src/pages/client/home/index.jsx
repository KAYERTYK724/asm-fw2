// /* eslint-disable jsx-a11y/alt-text */
import './style.css';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Card} from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart } from 'react-icons/fa';

const PageHome = () => {
  const products = [
    {
      name: 'Áo khoác biker',
      price: '$67.24',
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      name: 'Túi ngực nhiều ngăn',
      price: '$43.48',
      img: 'https://i.pinimg.com/736x/12/48/0e/12480e32ad438d7a80cfe34d11b5560b.jpg',
    },
    {
      name: 'Giày sneaker',
      price: '$60.9',
      img: 'https://i.pinimg.com/736x/a6/68/40/a66840569ded1f85eb9a478a9009cb3a.jpg',
    },
    {
      name: 'Balo da',
      price: '$31.37',
      img: 'https://i.pinimg.com/736x/b2/59/c8/b259c858ea200c97030adb122c43a4fa.jpg',
    },
    {
      name: 'Áo khoác biker',
      price: '$67.24',
      img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    },
    {
      name: 'Túi ngực nhiều ngăn',
      price: '$43.48',
      img: 'https://i.pinimg.com/736x/12/48/0e/12480e32ad438d7a80cfe34d11b5560b.jpg',
    },
    {
      name: 'Giày sneaker',
      price: '$60.9',
      img: 'https://i.pinimg.com/736x/a6/68/40/a66840569ded1f85eb9a478a9009cb3a.jpg',
    },
    {
      name: 'Balo da',
      price: '$31.37',
      img: 'https://i.pinimg.com/736x/b2/59/c8/b259c858ea200c97030adb122c43a4fa.jpg',
    },
  ];
  
  return (
    <>
      {/* HERO */}
      <section className='hero'>
        <Container>
          <Row className='align-items-center'>
            {/* TEXT */}
            <Col lg={5} md={6}>
              <div className='hero-text'>
                <span>Bộ sưu tập mùa hè</span>
                <h1>Bộ sưu tập Thu - Đông 2030</h1>
                <p>
                  Thương hiệu chuyên cung cấp các sản phẩm cao cấp. Được sản xuất với cam kết
                  chất lượng cao nhất.
                </p>

                <Button className='hero-btn'>
                  Mua ngay <FaArrowRight />
                </Button>

                {/* SOCIAL */}
                <div className='hero-social'>
                  <FaFacebookF />
                  <FaTwitter />
                  <FaInstagram />
                </div>
              </div>
            </Col>
          </Row>

          {/* ARROWS */}
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
            {/* LEFT BIG */}
            <Col md={6}>
              <Card className='banner-card'>
                <Card.Img src='https://i.pinimg.com/736x/e3/4a/d5/e34ad5dad362d3ef63c5fa02d84c0a5a.jpg' />
                <Card.ImgOverlay className='banner-overlay'>
                  <h3>Bộ sưu tập quần áo 2030</h3>
                  <p className='shop-now'>Mua ngay</p>
                </Card.ImgOverlay>
              </Card>
            </Col>

            {/* RIGHT TOP */}
            <Col md={6}>
              <Row className='g-4'>
                <Col md={12}>
                  <Card className='banner-card small'>
                    <Card.Img src='https://i.pinimg.com/736x/39/a5/f8/39a5f84a68605f292bcf4f78a8e3097e.jpg' />
                    <Card.ImgOverlay className='banner-overlay'>
                      <h4>Phụ kiện</h4>
                      <p className='shop-now'>Mua ngay</p>
                    </Card.ImgOverlay>
                  </Card>
                </Col>

                {/* RIGHT BOTTOM */}
                <Col md={12}>
                  <Card className='banner-card small'>
                    <Card.Img src='https://i.pinimg.com/736x/b0/e0/e8/b0e0e876ca7b09f13f75295c51e84ed6.jpg' />
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
            {products.map((p, i) => (
              <Col lg={3} md={6} sm={6} key={p.id} className='mb-4' >
                <Link to='/detailShop' className='text-decoration-none text-black'>
                  <div className='product-card text-center position-relative'>
                    <div className='product-img mb-3 overflow-hidden position-relative'>
                      <img src={p.img} alt={p.name} className='img-fluid w-100' />
                      <div className='product-hover-overlay'>
                        <FaShoppingCart />
                      </div>
                    </div>
                    <h6 className='fw-bold'>{p.name}</h6>
                    <p className='text-danger fw-bold'>{p.price}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* DEAL */}
      <section className='deal-section py-5'>
        <Container>
          <Row className='align-items-center'>
            {/* LEFT TEXT */}
            <Col md={3}>
              <div className='deal-left'>
                <p>Thời trang hot</p>
                <h4>Bộ sưu tập giày</h4>
                <p>Phụ kiện</p>
              </div>
            </Col>

            {/* IMAGE */}
            <Col md={5} className='text-center position-relative'>
              <img
                src='https://i.pinimg.com/736x/ac/cf/91/accf91f906df1c14efdc21d377eb94e9.jpg'
                alt=''
                className='deal-img'
              />

              {/* PRICE BADGE */}
              <div className='price-badge'>
                <span>Giảm còn</span>
                <h5>$29.99</h5>
              </div>
            </Col>

            {/* RIGHT CONTENT */}
            <Col md={4}>
              <div className='deal-content'>
                <p className='deal-label'>ƯU ĐÃI TRONG TUẦN</p>
                <h3>Túi đeo ngực nhiều ngăn màu đen</h3>

                {/* COUNTDOWN */}
                <div className='countdown'>
                  <div>
                    <h4>30</h4>
                    <span>Ngày</span>
                  </div>
                  <div>
                    <h4>01</h4>
                    <span>Giờ</span>
                  </div>
                  <div>
                    <h4>06</h4>
                    <span>Phút</span>
                  </div>
                  <div>
                    <h4>20</h4>
                    <span>Giây</span>
                  </div>
                </div>

                <Button variant='dark'>Mua ngay</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* INSTAGRAM */}
      <section className='instagram-section py-5'>
        <Container>
          <Row className='align-items-center'>
            {/* GRID */}
            <Col md={8}>
              <div className='instagram-grid'>
                <img src='https://i.pinimg.com/736x/9a/b1/2f/9ab12fd7e62ee1592c3ab8ada966e71e.jpg' alt=""/>
                <img src='https://i.pinimg.com/736x/a9/d2/02/a9d2021edbdf4e38d87da75db5af81dd.jpg' alt=""/>
                <img src='https://i.pinimg.com/736x/83/a2/42/83a24247c4520e1e13569c4299c7c039.jpg' alt=""/>
                <img src='https://i.pinimg.com/736x/fa/44/f2/fa44f27d2d155f094c45930be83ede04.jpg' alt=""/>
                <img src='https://i.pinimg.com/736x/5e/ba/f2/5ebaf2fbeac63d4850ba7226704fd789.jpg' alt=""/>
                <img src='https://i.pinimg.com/736x/09/03/8c/09038ce2f04586e085df81e7d01e773b.jpg' alt=""/>
              </div>
            </Col>

            {/* TEXT */}
            <Col md={4}>
              <div className='instagram-content'>
                <h3>Instagram</h3>
                <p>Theo dõi chúng tôi để cập nhật xu hướng thời trang mới nhất.</p>
                <h5>#ThoiTrangNam</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PageHome;
