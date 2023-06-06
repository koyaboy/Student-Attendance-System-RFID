import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/ManageCourses.css"
export default function ManageCourses() {

    const [courses, setCourses] = useState([])
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const { user } = useAuthContext()

    useEffect(() => {
        axios.get("http://localhost:4000/admin/getCourses", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setCourses(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])


    const handleDelete = (courseId, courseCode) => {

        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.delete(`http://localhost:4000/admin/deleteCourse/${courseId}/${courseCode}/${actionBy}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    setCourses((prevCourses) =>
                        prevCourses.filter((course) => course._id != courseId)
                    )

                    setSuccess(res.data.message)
                    setError("")
                }
            })

            .catch(err => {
                console.log(err)
                setSuccess("")
                setError(err.data.message)
            })
    }
    return (
        <div className="manage-courses-container">
            <h2 className="manage-courses-heading">Manage Courses</h2>
            <select className="manage-courses-select" name="department">
                <option value="Computer Science">Computer Science</option>
            </select>

            <Link to="/admin/addcourse"><button className="add-course-button">Add Course</button></Link>

            <table className="manage-courses-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Instructor</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses &&
                        courses.map((course) => (
                            <tr key={course._id}>
                                <td>{course.title}</td>
                                <td>{course.code}</td>
                                <td>{course.description}</td>
                                <td>
                                    {course.instructor.map((instructor) => (
                                        <span key={instructor._id}>{instructor.title}. {instructor.firstname} {instructor.lastname}</span>
                                    ))}
                                </td>

                                <td>
                                    <Link to={`/admin/updateCourse/${course._id}`}><button className="manage-courses-button edit">Edit</button></Link>
                                    <button
                                        className="manage-courses-button delete"
                                        onClick={(() => handleDelete(course._id, course.code))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div >
    )
}