import React, { useState } from 'react';
import SidebarAdmin from '../../component/admin/Sidebar';
import HeaderAdmin from '../../component/admin/Header';
import './style.css';

const AdminLayout = ({ children }) => {
    const [sidebarActive, setSidebarActive] = useState(false);

    return (
        <div className={`admin-wrapper ${sidebarActive ? 'sidebar-toggled' : ''}`}>
            <SidebarAdmin />
            <div className="content">
                <HeaderAdmin toggleSidebar={() => setSidebarActive(!sidebarActive)} />
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;