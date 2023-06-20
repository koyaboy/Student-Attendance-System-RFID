import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import axios from "axios";

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
            <form onSubmit={ViewAttendance}>
                <label htmlFor="selectedCourse">SELECT COURSE</label>
                <select
                    id="selectedCourse"
                    name="selectedCourse"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">-- SELECT COURSE --</option>
                    {courses &&
                        courses.map((course) => (
                            <>
                                <option value={course._id}>{course.code}</option>
                            </>
                        ))
                    }

                </select>


                <button onClick={(e) => ViewAttendance(e, student.username, selectedCourse)}> VIEW ATTENDANCE</button>


            </form>

            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Present</td>
                    </tr>
                </thead>

                <tbody>
                    {attendanceData &&
                        attendanceData.map((attendance) => (
                            <tr>
                                <td>{attendance.date}</td>
                                <td>{attendance.present ? "1" : "0"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}