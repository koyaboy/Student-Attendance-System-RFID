import React from "react";
import { useState } from "react";
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"

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

        axios.post("http://localhost:4000/admin/createCourse", {
            department,
            title,
            code,
            description,
            instructor
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
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="message">
                    {success && <div>Course Successfully Created</div>}
                    {error && <div>All fields must be completed !!!</div>}
                </div>

                <label>Department</label>
                <input
                    type="text"
                    name="department"
                    value={department}
                />

                <label>Course Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label>Course Code</label>
                <input
                    type="text"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}

                />

                <label>Course Description</label>
                <input
                    type="text"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <label>Course Instructor</label>
                <input
                    type="text"
                    name="instructor"
                    onChange={(e) => setInstructor(e.target.value)}
                    value={instructor}
                />

                <button>Submit</button>
            </form>
        </div>
    )
}