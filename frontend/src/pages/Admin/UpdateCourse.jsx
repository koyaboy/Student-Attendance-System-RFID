import React from "react"
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/AddCourse.css"

export default function UpdateCourse() {

    const navigate = useNavigate()

    const { courseId } = useParams()

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

        axios.put(`http://localhost:4000/admin/updateCourse/${courseId}`, {
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
                navigate("/admin/managecourses")
                console.log(res)
            })

            .catch(err => {
                setSuccess(false)
                setError(true)
                console.log(err)
            })

    }

    return (
        <div className="add-courses-wrapper">
            <h2 className="add-courses-title">Update Course</h2>
            <div className="add-courses-message">
                {success && <div className="add-courses-success">Course Successfully Created</div>}
                {error && <div className="add-courses-error">All fields must be completed !!!</div>}
            </div>

            <form onSubmit={handleSubmit}>
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