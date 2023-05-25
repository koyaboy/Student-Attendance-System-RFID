import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Teacher/TeacherNavbar.css"

export default function TeacherNavbar() {

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

    return (
        <div className="navbar">
            <ul className="nav--items">
                <Link
                    to="/teacher"
                    className={isActive ? "active" : ""}
                    onClick={handleClick}>
                    <li>HOME</li>
                </Link>

                <Link
                    to="/teacher/setupattendance"
                    className={isActive2 ? "active" : ""}
                    onClick={handleClick2}
                >
                    <li>SETUP ATTENDANCE</li>
                </Link>

                <Link
                    to="/teacher/uploadattendance"
                    className={isActive3 ? "active" : ""}
                    onClick={handleClick3}
                >
                    <li>UPLOAD ATTENDANCE</li>
                </Link>

                <li className="logout">LOGOUT</li>

                <li className="omegaSemester">OMEGA SEMESTER</li>
            </ul>
        </div>
    )


}

