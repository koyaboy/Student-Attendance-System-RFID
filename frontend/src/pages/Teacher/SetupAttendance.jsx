import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/Teacher/SetupAttendance.css";

export default function SetupAttendance() {
    const { user } = useAuthContext();

    const [coursesTaught, setCoursesTaught] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [attendance1Start, setAttendance1Start] = useState("");
    const [attendance1End, setAttendance1End] = useState("");
    const [attendance2Start, setAttendance2Start] = useState("");
    const [attendance2End, setAttendance2End] = useState("");

    // Get teacher Username from Local Storage
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

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(
                "http://localhost:4000/teacher/setupAttendance",
                {
                    selectedCourse,
                    date,
                    startTime,
                    endTime,
                    attendance1Start,
                    attendance1End,
                    attendance2Start,
                    attendance2End,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                setSelectedCourse("")
                setDate("")
                setStartTime("")
                setEndTime("")
                setAttendance1Start("")
                setAttendance1End("")
                setAttendance2Start("")
                setAttendance2End("")
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <select
                name="selectedCourse"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="setup-selectCourse"
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

            <form onSubmit={handleSubmit} className="setup-form">
                <label htmlFor="date" className="setup-label">
                    Date:
                </label>
                <input
                    type="Date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="startTime" className="setup-label">
                    Set Start Time:
                </label>
                <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="endTime" className="setup-label">
                    Set End Time:
                </label>
                <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="attendance1Start" className="setup-label">
                    1st Attendance Start Time:
                </label>
                <input
                    type="time"
                    id="attendance1Start"
                    name="attendance1Start"
                    value={attendance1Start}
                    onChange={(e) => setAttendance1Start(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="attendance1End" className="setup-label">
                    1st Attendance End Time:
                </label>
                <input
                    type="time"
                    id="attendance1End"
                    name="attendance1End"
                    value={attendance1End}
                    onChange={(e) => setAttendance1End(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="attendance2Start" className="setup-label">
                    2nd Attendance Start Time:
                </label>
                <input
                    type="time"
                    id="attendance2Start"
                    name="attendance2Start"
                    value={attendance2Start}
                    onChange={(e) => setAttendance2Start(e.target.value)}
                    className="setup-input"
                />

                <label htmlFor="attendance2End" className="setup-label">
                    2nd Attendance End Time:
                </label>
                <input
                    type="time"
                    id="attendance2End"
                    name="attendance2End"
                    value={attendance2End}
                    onChange={(e) => setAttendance2End(e.target.value)}
                    className="setup-input"
                />

                <button className="setup-button">SETUP</button>
            </form>
        </>
    );
}
