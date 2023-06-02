import React from "react";
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Admin/AddStudent.css"
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext"

export default function ManageStudents() {

    const navigate = useNavigate()
    const { studentId } = useParams()

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [level, setLevel] = useState("")
    const [department, setDepartment] = useState("Computer Science")
    const [role, setRole] = useState("S")

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const { user } = useAuthContext()



    function handleSubmit(e) {
        e.preventDefault()

        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.put(`http://localhost:4000/admin/updateStudent/${studentId}`, {
            id: studentId,
            firstname,
            lastname,
            username,
            password,
            level,
            department,
            role,
            actionBy
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                navigate("/admin/managestudents")
                console.log(res)
            })
            .catch(err => {
                setError(true)
                setSuccess(false)
                console.log(err)
            })
    }
    return (
        <div className="add-student">
            <h2 className="add-student-title">Update Student</h2>
            <div className="add-student-message">
                {success && <div className="add-student-success">Student Updated Successfully</div>}
                {error && <div className="add-student-error">All fields must be completed !!!</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="add-student-group">
                    <label className="add-student-label">First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="add-student-input"
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="add-student-input"
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="add-student-input"
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="add-student-input"
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={department}
                        className="add-student-input"
                        readOnly
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Level:</label>
                    <input
                        type="text"
                        name="level"
                        value={level}
                        className="add-student-input"
                        onChange={(e) => setLevel(e.target.value)}
                    />
                </div>

                <div className="add-student-group">
                    <label className="add-student-label">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={role}
                        className="add-student-input"
                        readOnly
                    />
                </div>

                <button className="add-student-submit">Submit</button>
            </form>
        </div>

    )
}