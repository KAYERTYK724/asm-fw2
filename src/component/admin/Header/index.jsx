import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { FaBars} from 'react-icons/fa';
import './style.css';

const HeaderAdmin = ({ toggleSidebar }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
        setUser(JSON.parse(userData));
    }
    }, []);

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
                        <img className="rounded-circle me-lg-2" src="https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg" alt="" 
                        style={{ width: '40px', height: '40px' , objectFit: 'cover'}} />
                        <span className="d-none d-lg-inline-flex">
                            {user ? user.fullname || user.name : "Admin"}
                        </span>
                    </div>
                } id="user-dropdown" align="end">
                    <NavDropdown.Item className='dropdown-item'>Hồ sơ của tôi</NavDropdown.Item>
                    <NavDropdown.Item
                        className='dropdown-item'
                        onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            window.location.href = "/login";
                        }}
                        >
                        Đăng xuất
                        </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

export default HeaderAdmin;