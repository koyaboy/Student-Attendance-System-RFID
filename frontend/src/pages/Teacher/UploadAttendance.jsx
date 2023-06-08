import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function UploadAttendance() {
    const { user } = useAuthContext();

    const [attendances, setAttendances] = useState([]);
    const [coursesTaught, setCoursesTaught] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState("");

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

    return (
        <>
            <form onSubmit={handleFindAttendance}>
                <select
                    name="selectedCourse"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
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

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button>FIND</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Matric Number</th>
                        <th>Surname</th>
                        <th>First Name</th>
                        <th>Present</th>
                    </tr>
                </thead>

                <tbody>
                    {attendances &&
                        attendances.map((attendance) => (
                            <tr key={attendance._id}>
                                <td>{attendance.username.username}</td>
                                <td>{attendance.username.firstname}</td>
                                <td>{attendance.username.lastname}</td>
                                <td>{attendance.present ? "1" : "0"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}
