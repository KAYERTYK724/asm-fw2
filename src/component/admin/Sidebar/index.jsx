import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaUserEdit, FaTachometerAlt, FaCube } from 'react-icons/fa';
import './style.css';

const SidebarAdmin = () => {
    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                <a href="/" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><FaUserEdit className="me-2" />DarkPan</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg" alt="User" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0 text-white">John Doe</h6>
                        <small>Quản trị viên</small>
                    </div>
                </div>
                <Nav className="navbar-nav w-100 flex-column">
                    <Nav.Link as={Link} to='/admin/dashboard' className="active"><FaTachometerAlt className="me-2" />DASHBOARD</Nav.Link>
                    <Nav.Link href="#"><FaCube className="me-2" />DANH MỤC</Nav.Link>
                    <Nav.Link href="#"><FaCube className="me-2" />SẢN PHẨM</Nav.Link>
                    <Nav.Link href="#"><FaCube className="me-2" />BÌNH LUẬN</Nav.Link>
                    <Nav.Link href="#"><FaCube className="me-2" />ĐƠN HÀNG</Nav.Link>
                    <Nav.Link href="#"><FaCube className="me-2" />NGƯỜI DÙNG</Nav.Link>
                </Nav>
            </nav>
        </div>
    );
};

export default SidebarAdmin;