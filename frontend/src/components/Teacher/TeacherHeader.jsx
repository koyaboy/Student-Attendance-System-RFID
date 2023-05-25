import React from "react"
import "../../styles/Teacher/TeacherHeader.css"

export default function TeacherHeader() {
    return (
        <div className="heading">
            <img src="../images/teacher.png"
                className="teacherImage"
                alt="teacherImage" />

            <div className="heading--text">
                <p className="welcome--back"><strong>WELCOME BACK</strong></p>
                <p className="name">DR.JONATHAN OLURANTI</p>
            </div>
        </div >
    )
}