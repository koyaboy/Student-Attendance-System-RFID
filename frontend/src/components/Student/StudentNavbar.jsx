import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"
import { useLogout } from "../../hooks/useLogout"


export default function StudentNavbar() {
    const { logout } = useLogout()

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);

    function handleClick() {
        setIsActive(prevIsActive => !prevIsActive)
        setIsActive2(false)
        setIsActive3(false)
    }

    function handleClick2() {
        setIsActive(false)
        setIsActive2(prevIsActive2 => !prevIsActive2)
        setIsActive3(false)
    }

    function handleClick3() {
        setIsActive(false)
        setIsActive2(false)
        setIsActive3(prevIsActive3 => !prevIsActive3)
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
                    to="/viewattendance"
                    className={isActive2 ? "active" : ""}
                    onClick={handleClick2}
                >
                    <li>VIEW ATTENDANCE</li>
                </Link>

                <Link
                    to="/complaintsform"
                    className={isActive3 ? "active" : ""}
                    onClick={handleClick3}
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

