import './style.css';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaShoppingBag, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Header = () => {
<<<<<<< HEAD
  const user = { name: 'Nguyễn Văn A', isLoggedIn: true };
=======
  const user = { name: "Nguyễn Văn A", isLoggedIn: true };
>>>>>>> d55cbe890fad77a9a85fc6dd27497f2145788071
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
<<<<<<< HEAD
              <Nav.Link as={Link} to='/' className='active'>
                TRANG CHỦ
              </Nav.Link>
              <Nav.Link as={Link} to='/shop'>
                CỬA HÀNG
              </Nav.Link>
              <Nav.Link as={Link} to='/blog'>
                TIN TỨC
              </Nav.Link>
=======
              <Nav.Link as={Link} to='/' className='active'>TRANG CHỦ</Nav.Link>
              <Nav.Link as={Link} to='/shop'>CỬA HÀNG</Nav.Link>
              <Nav.Link as={Link} to='/blog'>TIN TỨC</Nav.Link>
>>>>>>> d55cbe890fad77a9a85fc6dd27497f2145788071
              <Nav.Link>GIỚI THIỆU</Nav.Link>
              <Nav.Link>LIÊN HỆ</Nav.Link>
            </Nav>

            {/* ICONS */}
            <div className='nav-icons'>
              <FaSearch />
<<<<<<< HEAD
              <div className='cart'>
                <FaShoppingBag />
                <span className='count'>0</span>
              </div>
              <div className='user-dropdown'>
                <NavDropdown
                  title={
                    <span className='user-info'>
                      <FaUser className='me-2' />
                      <span className='user-name d-none d-md-inline'>{user.name}</span>
                    </span>
                  }
                  id='user-nav-dropdown'
                  align='end'
                >
                  <NavDropdown.Item as={Link} to='/profile' className='dropdown-item'>
                    <FaUser className='me-2' /> Trang cá nhân
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to='/admin' className='dropdown-item'>
                    <FaCog className='me-2' /> Quản trị viên
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item className='dropdown-item'>
                    <FaSignOutAlt className='me-2' /> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
=======
              <div className="cart">
                <Link to="/cart">
                  <FaShoppingBag />
                  <span className="count">0</span>
                </Link>
              </div>
              <div className="user-dropdown">
                <NavDropdown
                  title={
                    <Link to="/login" className="user-info">
                      <FaUser className="me-2" />
                      <span className="user-name d-none d-md-inline">
                        {user?.name || "Login"}
                      </span>
                    </Link>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <FaUser className="me-2 text-muted" /> Trang cá nhân
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin">
                    <FaCog className="me-2 text-muted" /> Quản trị viên
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-danger">
                    <FaSignOutAlt className="me-2" /> Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
>>>>>>> d55cbe890fad77a9a85fc6dd27497f2145788071
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
