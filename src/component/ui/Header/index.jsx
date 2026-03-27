import './style.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSearch, FaHeart, FaShoppingBag } from 'react-icons/fa';

const Header = () => {
  return (
    <>
      {/* HEADER */}
      {/* TOP BAR */}
      <div className='topbar'>
        <Container>
          <Row>
            <Col md={6}>
              <p className='mb-0'>Miễn phí vận chuyển, hoàn trả trong 30 ngày</p>
            </Col>
            <Col md={6} className='text-end'>
              <span className='me-3'>Đăng nhập</span>
              <span className='me-3'>Câu hỏi</span>
            </Col>
          </Row>
        </Container>
      </div>

      {/* MAIN NAVBAR */}
      <Navbar expand='lg' className='main-navbar'>
        <Container>
          {/* LOGO */}
          <Navbar.Brand className='logo fs-3'>
            <span className='text-danger'>Male </span>fashion<span className='dot'>.</span>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            {/* MENU */}
            <Nav className='mx-auto menu'>
              <Nav.Link as={Link} to='/' className='active'>TRANG CHỦ</Nav.Link>
              <Nav.Link as={Link} to='/shop'>CỬA HÀNG</Nav.Link>
              <Nav.Link  as={Link} to='/blog'>TIN TỨC</Nav.Link>
              <Nav.Link>GIỚI THIỆU</Nav.Link>
              <Nav.Link>LIÊN HỆ</Nav.Link>
            </Nav>

            {/* ICONS */}
            <div className='nav-icons'>
              <FaSearch />
              <FaHeart />
              <div className='cart'>
                <FaShoppingBag />
                <span className='count'>0</span>
              </div>
              <span className='price'>$0.00</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
