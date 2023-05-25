import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../components/Admin/AdminNavbar"
import AdminHeader from "../../components/Admin/AdminHeader"
import Footer from "../../components/Footer";

export default function AdminDashboard() {
    useEffect(() => {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }, [])

    return (
        <div className="dashboard">

            <AdminNavbar />

            <div className="main">
                <AdminHeader />
                <hr />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}