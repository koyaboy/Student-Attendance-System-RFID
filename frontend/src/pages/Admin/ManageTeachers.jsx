import React from "react";
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios"
import { Link } from "react-router-dom"
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

    const handleDelete = (teacherId, username) => {
        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.delete(`http://localhost:4000/admin/deleteTeacher/${teacherId}/${username}/${actionBy}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

            .then(res => {
                if (res.status == 200) {
                    setTeachers((prevTeachers) =>
                        prevTeachers.filter((teacher) => teacher._id !== teacherId)
                    )
                }
            })

            .catch(err => console.log(err))
    }
    return (
        <div className="manage-teachers-container">
            <h2 className="manage-teachers-heading">Manage Teachers</h2>
            <select className="manage-students-select">
                <option>Computer Science</option>
            </select>
            <Link to="/admin/addteacher"><button className="add-teacher-button">Add Teacher</button></Link>
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
                                        <span key={course._id}>{course.code}    </span>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/admin/updateTeacher/${teacher._id}`}><button className="manage-teachers-button edit">Edit</button></Link>
                                    <button
                                        className="manage-teachers-button delete"
                                        onClick={() => handleDelete(teacher._id, teacher.username)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}