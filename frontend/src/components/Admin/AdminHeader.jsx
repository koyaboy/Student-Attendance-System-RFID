import React from "react"
import "../../styles/Admin/AdminHeader.css"

export default function Header() {

    //Get stored user from local storage
    const storedUser = localStorage.getItem("user")
    let username = "";
    if (storedUser) {
        const user = JSON.parse(storedUser);
        username = user.username;
    }

    return (
        <div className="heading">
            <img src="../images/Dashboard/admin.png"
                className="studentImage"
                alt="adminImage" />

            <div className="heading--text">
                <p className="welcome--back"><strong>WELCOME BACK</strong></p>
                <p className="name">ADMIN: <strong>{username}</strong></p>
            </div>
        </div>
    )
}