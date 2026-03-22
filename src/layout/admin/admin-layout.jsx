import React, { useState } from 'react';
import SidebarAdmin from '../../component/admin/Sidebar';
import HeaderAdmin from '../../component/admin/Header';
import FooterAdmin from '../../component/admin/Footer';
import Dashboard from '../../pages/admin/dashboard';
import './style.css';

const AdminLayout = () => {
    const [sidebarActive, setSidebarActive] = useState(false);

    return (
        <div className={`admin-wrapper ${sidebarActive ? 'sidebar-toggled' : ''}`}>
            <SidebarAdmin />
            <div className="content">
                <HeaderAdmin toggleSidebar={() => setSidebarActive(!sidebarActive)} />
                <Dashboard />
                <FooterAdmin />
            </div>
        </div>
    );
};

export default AdminLayout;