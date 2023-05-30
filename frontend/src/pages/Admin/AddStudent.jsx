import React from "react";
import { useState } from "react"

export default function ManageStudents() {

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState("Computer Science")
    const [role, setRole] = useState("S")

    return (
        <>
            <h2>Manage Students</h2>

            <form>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                />


                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setUserName(e.target.value)}
                />


                <label>Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}

                />


                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    value={department}
                />

                <label>Role:</label>
                <input
                    type="text"
                    name="role"
                    value={role}
                />


            </form>
        </>

    )
}