import React from "react";
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios"
import "../../styles/Admin/ManageTeachers.css"

export default function ManageTeachers() {

    const [teachers, setTeachers] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        axios.get("http://localhost:4000/admin/getTeachers", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setTeachers(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="manage-teachers-container">
            <h2 className="manage-teachers-heading">Manage Teachers</h2>
            <select className="manage-students-select">
                <option>Computer Science</option>
            </select>
            <button className="add-teacher-button">Add Teacher</button>
            <table className="manage-teachers-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Courses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers &&
                        teachers.map((teacher) => (
                            <tr key={teacher._id}>
                                <td>{teacher.title}</td>
                                <td>{teacher.firstname}</td>
                                <td>{teacher.lastname}</td>
                                <td>{teacher.username}</td>
                                <td>
                                    {teacher.courses.map((course) => (
                                        <span key={course._id}>{course.code}</span>
                                    ))}
                                </td>
                                <td>
                                    <button className="manage-teachers-button edit">Edit</button>
                                    <button className="manage-teachers-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}