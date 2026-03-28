import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { FaBars} from 'react-icons/fa';
import './style.css';

const HeaderAdmin = ({ toggleSidebar }) => {


    return (
        <Navbar bg="secondary" variant="dark" expand className="sticky-top px-4 py-0">
            <Button variant="link" className="sidebar-toggler flex-shrink-0 text-primary" onClick={toggleSidebar}>
                <FaBars />
            </Button>
            <Form className="d-none d-md-flex ms-4">
                <Form.Control className="bg-dark border-0 text-white" type="search" placeholder="Tìm kiếm..." />
            </Form>
            <Nav className="ms-auto align-items-center">
                <NavDropdown title={
                    <div className="d-inline-flex align-items-center">
                        <img className="rounded-circle me-lg-2" src="https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg" alt="" style={{ width: '40px', height: '40px' , objectFit: 'cover'}} />
                        <span className="d-none d-lg-inline-flex">John Doe</span>
                    </div>
                } id="user-dropdown" align="end">
                    <NavDropdown.Item>Hồ sơ của tôi</NavDropdown.Item>
                    <NavDropdown.Item>Cài đặt</NavDropdown.Item>
                    <NavDropdown.Item>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

export default HeaderAdmin;