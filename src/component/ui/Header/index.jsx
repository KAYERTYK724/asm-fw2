import './style.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Row, Col, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaShoppingBag, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
              <Nav.Link as={Link} to='/'>
                TRANG CHỦ
              </Nav.Link>
              <Nav.Link as={Link} to='/shop'>
                CỬA HÀNG
              </Nav.Link>
              <Nav.Link as={Link} to='/blog'>
                TIN TỨC
              </Nav.Link>
              <Nav.Link as={Link} to='/about'>
                GIỚI THIỆU
              </Nav.Link>
              <Nav.Link as={Link} to='/contact'>
                LIÊN HỆ
              </Nav.Link>
            </Nav>

            {/* ICONS */}
            <div className='nav-icons'>
              <FaSearch />
              <div className='cart'>
                <Link to='/cart' className='text-decoration-none text-black'>
                  <FaShoppingBag />
                </Link>
              </div>
              <div className='user-dropdown'>
                <NavDropdown
                  title={
                    <>
                      <FaUser className='me-2' />
                      <span className='user-name d-none d-md-inline'>
                        {user ? user.fullname || user.fullname : 'Login'}
                      </span>
                    </>
                  }
                  id='user-nav-dropdown'
                  align='end'
                >
                  {/* CHƯA LOGIN */}
                  {!user && (
                    <NavDropdown.Item as={Link} to='/login'>
                      <FaUser className='me-2' /> Đăng nhập
                    </NavDropdown.Item>
                  )}

                  {/* ĐÃ LOGIN */}
                  {user && (
                    <>
                      <NavDropdown.Item as={Link} to='/profile'>
                        <FaUser className='me-2' /> Trang cá nhân
                      </NavDropdown.Item>

                      {/* Nếu có role admin thì mới hiện */}
                      {user.role === 'admin' && (
                        <NavDropdown.Item as={Link} to='/admin/dashboard'>
                          <FaCog className='me-2' /> Quản trị viên
                        </NavDropdown.Item>
                      )}

                      <NavDropdown.Divider />

                      <NavDropdown.Item
                        onClick={() => {
                          localStorage.removeItem('user');
                          localStorage.removeItem('token');
                          window.location.href = '/login';
                        }}
                      >
                        <FaSignOutAlt className='me-2' /> Đăng xuất
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
