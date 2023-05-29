import React from "react"
import "../../styles/Student/Header.css"
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Header() {

    const { user } = useAuthContext()
    return (
        <div className="heading">
            <img src="../images/Dashboard/student.png"
                className="studentImage"
                alt="studentImage" />

            <div className="heading--text">
                <p className="name">{user.firstname} {user.lastname} </p>
                <p className="course">COMPUTER SCIENCE</p>
                <p className="matric--number"><strong>{user.username}</strong></p>
            </div>
        </div>
    )
}