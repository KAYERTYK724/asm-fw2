import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserEdit, FaTachometerAlt, FaTh, FaKeyboard, FaTable, FaChartBar, FaFileAlt } from 'react-icons/fa';
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
                    <Nav.Link href="#" className="active"><FaTachometerAlt className="me-2" />Bảng điều khiển</Nav.Link>
                    <Nav.Link href="#"><FaTh className="me-2" />Tiện ích (Widgets)</Nav.Link>
                    <Nav.Link href="#"><FaKeyboard className="me-2" />Biểu mẫu</Nav.Link>
                    <Nav.Link href="#"><FaTable className="me-2" />Bảng biểu</Nav.Link>
                    <Nav.Link href="#"><FaChartBar className="me-2" />Biểu đồ</Nav.Link>
                    <Nav.Link href="#"><FaFileAlt className="me-2" />Trang mẫu</Nav.Link>
                </Nav>
            </nav>
        </div>
    );
};

export default SidebarAdmin;