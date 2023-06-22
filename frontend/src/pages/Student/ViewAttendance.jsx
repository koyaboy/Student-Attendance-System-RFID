import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import axios from "axios";

import "../../styles/Student/ViewAttendance.css"

export default function ViewAttendance() {
    const { user } = useAuthContext()

    const [attendanceData, setAttendanceData] = useState("");
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState("")

    //Get student from localstorage

    const storedUser = localStorage.getItem("user")
    const student = JSON.parse(storedUser);

    //Get Student Courses on Pageload

    useEffect(() => {
        axios.get(`http://localhost:4000/courses/${student.username}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                console.log(res)
                setCourses(res.data)
            })
            .catch(err => console.log(err))
    }, [])




    const ViewAttendance = (e, studentUsername, courseId) => {
        e.preventDefault()

        axios.get(`http://localhost:4000/viewattendance/${studentUsername}/${courseId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res)
                setAttendanceData(res.data);
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <form className="attendance-form" onSubmit={ViewAttendance}>
                <label htmlFor="selectedCourse">SELECT COURSE</label>
                <select
                    id="selectedCourse"
                    name="selectedCourse"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="course-select"
                >
                    <option value="">-- SELECT COURSE --</option>
                    {courses &&
                        courses.map((course) => (
                            <option key={course._id} value={course._id}>{course.code}</option>
                        ))
                    }
                </select>

                <button
                    type="submit"
                    onClick={(e) => ViewAttendance(e, student.username, selectedCourse)}
                    className="view-attendance-btn"
                >
                    VIEW ATTENDANCE
                </button>
            </form>

            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Present</th>
                    </tr>
                </thead>

                <tbody>
                    {attendanceData &&
                        attendanceData.map((attendance) => {
                            const date = new Date(attendance.date);
                            const formattedDate = date.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale

                            return (
                                <tr key={attendance.date}>
                                    <td>{formattedDate}</td>
                                    <td>{attendance.verified ? "1" : "0"}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>

    )
}