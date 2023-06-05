import React from "react"
import "../../styles/Admin/AdminHeader.css"

export default function Header() {
    return (
        <div className="heading">
            <img src="../images/Dashboard/admin.png"
                className="studentImage"
                alt="adminImage" />

            <div className="heading--text">
                <p className="name">ADEKOYA IREOLUWATOMIWA</p>
                <p className="course">COMPUTER SCIENCE</p>
                <p className="matric--number"><strong>19CG026387</strong></p>
            </div>
        </div>
    )
}