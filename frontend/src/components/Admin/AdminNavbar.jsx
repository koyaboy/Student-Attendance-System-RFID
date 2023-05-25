import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"

export default function TeacherNavbar() {

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const [isActive5, setIsActive5] = useState(false);
    const [isActive6, setIsActive6] = useState(false);

    function handleClick() {
        setIsActive(prevIsActive => !prevIsActive)
        setIsActive2(false)
        setIsActive3(false)
        setIsActive4(false)
        setIsActive5(false)
        setIsActive6(false)
    }

    function handleClick2() {
        setIsActive(false)
        setIsActive2(prevIsActive2 => !prevIsActive2)
        setIsActive3(false)
        setIsActive4(false)
        setIsActive5(false)
        setIsActive6(false)
    }

    function handleClick3() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(prevIsActive3 => !prevIsActive3)
        setIsActive4(false)
        setIsActive5(false)
        setIsActive6(false)
    }

    function handleClick4() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(false)
        setIsActive4(prevIsActive4 => !prevIsActive4)
        setIsActive5(false)
        setIsActive6(false)
    }

    function handleClick5() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(false)
        setIsActive4(false)
        setIsActive5(prevIsActive5 => !prevIsActive5)
        setIsActive6(false)
    }

    return (
        <div className="navbar">
            <ul className="nav--items">
                <Link
                    to="/admin"
                    className={isActive ? "active" : ""}
                    onClick={handleClick}>
                    <li>HOME</li>
                </Link>

                <Link
                    to="/admin/complaints"
                    className={isActive2 ? "active" : ""}
                    onClick={handleClick2}
                >
                    <li>COMPLAINTS</li>
                </Link>

                <Link
                    to="/admin/managecourses"
                    className={isActive3 ? "active" : ""}
                    onClick={handleClick3}
                >
                    <li>MANAGE COURSES</li>
                </Link>

                <Link
                    to="/admin/managestudents"
                    className={isActive4 ? "active" : ""}
                    onClick={handleClick4}>
                    <li>MANAGE STUDENTS</li>
                </Link>

                <Link
                    to="/admin/manageteachers"
                    className={isActive5 ? "active" : ""}
                    onClick={handleClick5}
                >
                    <li>MANAGE TEACHERS</li>
                </Link>

                <li className="logout">LOGOUT</li>

                <li className="omegaSemester">OMEGA SEMESTER</li>
            </ul>
        </div>
    )


}

