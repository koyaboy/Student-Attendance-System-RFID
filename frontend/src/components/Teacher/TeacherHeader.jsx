import React from "react"
import "../../styles/Teacher/TeacherHeader.css"

export default function TeacherHeader() {

    //Get user from local storage

    const storedUser = localStorage.getItem("user")
    let title, firstname, lastname = "";

    if (storedUser) {
        const user = JSON.parse(storedUser);
        title = user.title;
        firstname = user.firstname;
        lastname = user.lastname;
    }

    return (
        <div className="heading">
            <img src="../images/teacher.png"
                className="teacherImage"
                alt="teacherImage" />

            <div className="heading--text">
                <p className="welcome--back"><strong>WELCOME BACK</strong></p>
                <p className="name">{title}. {firstname} {lastname}</p>
            </div>
        </div >
    )
}