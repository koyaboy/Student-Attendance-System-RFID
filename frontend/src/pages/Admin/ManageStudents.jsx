import React from "react";
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
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

    const handleDelete = (studentId, username) => {

        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.delete(`http://localhost:4000/admin/deleteStudent/${studentId}/${username}/${actionBy}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    //Remove deleted student from the state
                    setStudents((prevStudents) =>
                        prevStudents.filter((student) => student._id !== studentId)
                    );
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="manage-students-container">
            <h2 className="manage-students-heading">Manage Students</h2>
            <select className="manage-students-select">
                <option>Computer Science</option>
            </select>

            <Link to="/admin/addstudent"><button className="add-student-button">Add Student</button></Link>
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
                                    <Link to={`/admin/updateStudent/${student._id}`}><button className="manage-students-button edit">Edit</button></Link>
                                    <button
                                        className="manage-students-button delete"
                                        onClick={() => handleDelete(student._id, student.username)}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}