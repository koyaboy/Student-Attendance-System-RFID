import React from "react";
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import "../../styles/Admin/ManageStudents.css"

export default function ManageStudents() {

    const [students, setStudents] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        axios.get("http://localhost:4000/admin/getStudents", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                setStudents(res.data)
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <div className="manage-students-container">
            <h2 className="manage-students-heading">Manage Students</h2>
            <select className="manage-students-select">
                <option>Computer Science</option>
            </select>

            <button className="add-student-button">Add Student</button>
            <table className="manage-students-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students &&
                        students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.username}</td>
                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                <td>{student.level}</td>
                                <td>
                                    <button className="manage-students-button edit">Edit</button>
                                    <button className="manage-students-button delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}