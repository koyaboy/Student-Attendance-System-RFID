import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"

import StudentNavbar from "../../components/Student/StudentNavbar";
import Footer from "../../components/Footer";
import Header from "../../components/Student/Header";
import "../../styles/Student/Dashboard.css"
import { useAuthContext } from "../../hooks/useAuthContext";
import Home from "./Home";


export default function Dashboard() {
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