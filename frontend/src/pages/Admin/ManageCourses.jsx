import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/ManageCourses.css"
export default function ManageCourses() {

    const [courses, setCourses] = useState([])

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

    return (
        <div className="manage-courses-container">
            <h2 className="manage-courses-heading">Manage Courses</h2>
            <select className="manage-courses-select" name="department">
                <option value="Computer Science">Computer Science</option>
            </select>

            <button className="add-course-button">Add Course</button>
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
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.code}</td>
                                <td>{course.description}</td>
                                <td>{course.instructor}</td>
                                <td>
                                    <button className="manage-courses-button edit">Edit</button>
                                    <button className="manage-courses-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}