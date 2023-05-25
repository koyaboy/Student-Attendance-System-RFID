import React from "react"
import "../../styles/Admin/AdminHeader.css"

export default function Header() {
    return (
        <div className="heading">
            <img src="../images/Dashboard/student.png"
                className="studentImage"
                alt="studentImage" />

            <div className="heading--text">
                <p className="name">ADEKOYA IREOLUWATOMIWA</p>
                <p className="course">COMPUTER SCIENCE</p>
                <p className="matric--number"><strong>19CG026387</strong></p>
            </div>
        </div>
    )
}