import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserEdit, FaTachometerAlt, FaTags, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './style.css';

const SidebarAdmin = () => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                {/* Logo */}
                <a href="/admin/dashboard" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><FaUserEdit className="me-2" />DarkPan</h3>
                </a>

                {/* User info */}
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img
                            className="rounded-circle"
                            src="https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg"
                            alt="User"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0 text-white">John Doe</h6>
                        <small>Quản trị viên</small>
                    </div>
                </div>

                <Nav className="navbar-nav w-100 flex-column">
                    {/* Dashboard */}
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <FaTachometerAlt className="me-2" />Bảng điều khiển
                    </NavLink>

                    {/* Category dropdown */}
                    <div
                        className="nav-link d-flex justify-content-between align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                        <span><FaTags className="me-2" />Danh mục</span>
                        {categoryOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </div>
                    {categoryOpen && (
                        <div className="ps-4">
                            <NavLink
                                to="/admin/category/list"
                                className={({ isActive }) => `nav-link py-1 ${isActive ? 'active' : ''}`}
                            >
                                Danh sách danh mục
                            </NavLink>
                            <NavLink
                                to="/admin/category/add"
                                className={({ isActive }) => `nav-link py-1 ${isActive ? 'active' : ''}`}
                            >
                                Thêm danh mục
                            </NavLink>
                        </div>
                    )}

                    {/* User dropdown */}
                    <div
                        className="nav-link d-flex justify-content-between align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setUserOpen(!userOpen)}
                    >
                        <span><FaUsers className="me-2" />Người dùng</span>
                        {userOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </div>
                    {userOpen && (
                        <div className="ps-4">
                            <NavLink
                                to="/admin/user/list"
                                className={({ isActive }) => `nav-link py-1 ${isActive ? 'active' : ''}`}
                            >
                                Danh sách người dùng
                            </NavLink>
                        </div>
                    )}
                </Nav>
            </nav>
        </div>
    );
};

export default SidebarAdmin;