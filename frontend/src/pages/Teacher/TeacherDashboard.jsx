import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import TeacherNavbar from "../../components/Teacher/TeacherNavbar";
import TeacherHeader from "../../components/Teacher/TeacherHeader";
import Footer from "../../components/Footer";

export default function TeacherDashboard() {

    useEffect(() => {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }, [])

    return (
        <div className="dashboard">

            <TeacherNavbar />

            <div className="main">
                <TeacherHeader />
                <hr />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}