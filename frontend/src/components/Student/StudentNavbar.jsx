import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"
import { useLogout } from "../../hooks/useLogout"


export default function StudentNavbar() {
    const { logout } = useLogout()

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);

    function handleClick() {
        setIsActive(prevIsActive => !prevIsActive)
        setIsActive2(false)
        setIsActive3(false)
        setIsActive4(false)
    }

    function handleClick2() {
        setIsActive(false)
        setIsActive2(prevIsActive2 => !prevIsActive2)
        setIsActive3(false)
        setIsActive4(false)
    }

    function handleClick3() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(prevIsActive3 => !prevIsActive3)
        setIsActive4(false)
    }

    function handleClick4() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(false)
        setIsActive4(prevIsActive4 => !prevIsActive4)
    }

    function handleLogout() {
        logout()
    }

    return (
        <div className="navbar">
            <ul className="nav--items">
                <Link
                    to="/"
                    className={isActive ? "active" : ""}
                    onClick={handleClick}>
                    <li>HOME</li>
                </Link>

                <Link
                    to="/registerCourses"
                    className={isActive2 ? "active" : ""}
                    onClick={handleClick2}>
                    <li>REGISTER COURSES </li>
                </Link>

                <Link
                    to="/viewattendance"
                    className={isActive3 ? "active" : ""}
                    onClick={handleClick3}
                >
                    <li>VIEW ATTENDANCE</li>
                </Link>

                <Link
                    to="/complaintsform"
                    className={isActive4 ? "active" : ""}
                    onClick={handleClick4}
                >
                    <li>COMPLAINTS FORM</li>
                </Link>

                <Link
                    to="/login"
                    onClick={handleLogout}>
                    <li className="logout">LOGOUT</li>
                </Link>

                <li className="omegaSemester">OMEGA SEMESTER</li>
            </ul>
        </div>
    )


}

