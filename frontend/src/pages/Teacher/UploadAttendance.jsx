import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/Teacher/UploadAttendance.css";

export default function UploadAttendance() {
    const { user } = useAuthContext();

    const [attendances, setAttendances] = useState([]);
    const [coursesTaught, setCoursesTaught] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")

    // GET USER FROM LOCAL STORAGE

    const storedUser = localStorage.getItem("user");
    let username = "";
    if (storedUser) {
        const user = JSON.parse(storedUser);
        username = user.username;
    }

    useEffect(() => {
        axios
            .get(`http://localhost:4000/teacher/getTeacherCourses/${username}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                console.log(res);
                setCoursesTaught(res.data);

            })
            .catch((err) => console.log(err));
    }, []);

    function handleFindAttendance(e) {
        e.preventDefault();

        const formattedDate = new Date(date).toISOString().split("T")[0];

        axios
            .get(
                `http://localhost:4000/teacher/getAttendance/${selectedCourse}/${formattedDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                setAttendances(res.data);
            })
            .catch((err) => console.log(err));
    }

    function handleUpload(e) {
        e.preventDefault()

        const formattedDate = new Date(date).toISOString().split("T")[0];

        axios.post("http://localhost:4000/teacher/uploadAttendance", {
            attendances,
            selectedCourse,
            formattedDate
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })

            .then((res) => {
                console.log(res)
                setAttendances([])
                setSuccess(res.data.message)
                setError("")
            })
            .catch(err => {
                console.log(err)
                setError(err.response.data.message)
                setSuccess("")
            })

    }

    function handleToggle(attendanceId) {
        setAttendances((prevAttendances) =>
            prevAttendances.map((attendance) => {
                if (attendance._id === attendanceId) {
                    return { ...attendance, present: !attendance.present }
                }
                return attendance
            })
        )
    }

    return (
        <>
            <form className="upload-form" onSubmit={handleFindAttendance}>
                <select
                    name="selectedCourse"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="course-select"
                >
                    <option default value="">
                        -- SELECT COURSE --
                    </option>
                    {coursesTaught.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.code}
                        </option>
                    ))}
                </select>

                <div className="upload-form-date">
                    <label htmlFor="date" className="date-label">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="date-input"
                    />

                </div>

                <button className="find-button">DISPLAY</button>
            </form>

            {
                success && <div>{success}</div>
            }

            {
                error && <div>{error}</div>
            }
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Matric Number</th>
                        <th>Surname</th>
                        <th>First Name</th>
                        <th>Present</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {attendances &&
                        attendances.map((attendance) => (
                            <tr key={attendance._id}>
                                <td>{attendance.username.username}</td>
                                <td>{attendance.username.lastname}</td>
                                <td>{attendance.username.firstname}</td>
                                <td>{attendance.present ? "1" : "0"}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleToggle(attendance._id)}
                                    >
                                        Toggle Attendance
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <form onSubmit={handleUpload}>
                {attendances && <button className="upload-button">UPLOAD</button>}
            </form>
        </>
    );
}
