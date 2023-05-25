import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import StudentNavbar from "../../components/Student/StudentNavbar";
import Footer from "../../components/Footer";
import Header from "../../components/Student/Header";
import "../../styles/Student/Dashboard.css"

export default function Dashboard() {

    useEffect(() => {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }, [])

    return (
        <div className="dashboard">

            <StudentNavbar />

            <div className="main">
                <Header />
                <hr />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}