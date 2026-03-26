import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import SidebarAdmin from '../../component/admin/Sidebar';
import HeaderAdmin from '../../component/admin/Header';
import FooterAdmin from '../../component/admin/Footer';
import './style.css';

const AdminLayout = () => {
    const [sidebarActive, setSidebarActive] = useState(false);

    return (
        <div className={`admin-wrapper ${sidebarActive ? 'sidebar-toggled' : ''}`}>
            <SidebarAdmin />
            <div className="content">
                <HeaderAdmin toggleSidebar={() => setSidebarActive(!sidebarActive)} />
                    <Outlet/>
                <FooterAdmin />
            </div>
        </div>
    );
};

export default AdminLayout;