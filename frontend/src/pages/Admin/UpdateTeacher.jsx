import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/AddTeacher.css"

export default function ManageTeachers() {

    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { teacherId } = useParams()

    const [title, setTitle] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState("Computer Science")
    const [role, setRole] = useState("T")

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.put(`http://localhost:4000/admin/updateTeacher/${teacherId}`, {
            title, firstname, lastname, username, password, department, role, actionBy
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                navigate("/admin/manageteachers")
                console.log(res)
            })

            .catch(err => {
                setError(true)
                setSuccess(false)
                console.log(err)
            })
    }
    return (
        <>
            <h2>Update Teacher</h2>

            <div className="add-teacher-message">
                {success && <div className="add-teacher-success">Teacher Successfully Created</div>}
                {error && <div className="add-teacher-error">All fields must be completed !!!</div>}
            </div>

            <form onSubmit={handleSubmit}>
                <label className="add-teacher-label">Title:</label>
                <select
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="add-teacher-input"
                >
                    <option value="">-- Select Title --</option>
                    <option value="Prof">Prof</option>
                    <option value="Dr">Dr</option>
                    <option value="Mr">Mr</option>
                </select>

                <label className="add-teacher-label">First Name:</label>
                <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="add-teacher-input"
                />

                <label className="add-teacher-label">Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    className="add-teacher-input"
                />

                <label className="add-teacher-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="add-teacher-input"
                />

                <label className="add-teacher-label">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="add-teacher-input"
                />

                <label className="add-teacher-label">Department:</label>
                <input
                    type="text"
                    name="department"
                    value={department}
                    className="add-teacher-input"
                />

                <label className="add-teacher-label">Role:</label>
                <input
                    type="text"
                    name="role"
                    value={role}
                    className="add-teacher-input"
                />

                <button className="add-teacher-submit">Submit</button>


            </form>
        </>

    )
}