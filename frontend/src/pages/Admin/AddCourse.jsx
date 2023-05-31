import React from "react";
import { useState } from "react";
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/AddCourse.css"
export default function ManageCourses() {

    const [department, setDepartment] = useState("Computer Science")
    const [title, setTitle] = useState("")
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("")
    const [instructor, setInstructor] = useState("")

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

        axios.post("http://localhost:4000/admin/createCourse", {
            department,
            title,
            code,
            description,
            instructor,
            actionBy
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                setTitle("")
                setCode("")
                setDescription("")
                setInstructor("")
                setSuccess(true)
                setError(false)
            })

            .catch(err => {
                console.log(err)
                setSuccess(false)
                setError(true)
            })

    }

    return (
        <div className="add-courses-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="add-courses-message">
                    {success && <div className="add-courses-success">Course Successfully Created</div>}
                    {error && <div className="add-courses-error">All fields must be completed !!!</div>}
                </div>

                <div className="add-courses-group">
                    <label className="add-courses-label">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={department}
                        className="add-courses-input"
                        onChange={e => setDepartment(e.target.value)}
                    />
                </div>

                <div className="add-courses-group">
                    <label className="add-courses-label">Course Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        className="add-courses-input"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="add-courses-group">
                    <label className="add-courses-label">Course Code:</label>
                    <input
                        type="text"
                        name="code"
                        value={code}
                        className="add-courses-input"
                        onChange={e => setCode(e.target.value)}
                    />
                </div>

                <div className="add-courses-group">
                    <label className="add-courses-label">Course Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        className="add-courses-input"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="add-courses-group">
                    <label className="add-courses-label">Course Instructor:</label>
                    <input
                        type="text"
                        name="instructor"
                        value={instructor}
                        className="add-courses-input"
                        onChange={e => setInstructor(e.target.value)}
                    />
                </div>

                <button className="add-courses-submit">Submit</button>
            </form>
        </div>
    )
}