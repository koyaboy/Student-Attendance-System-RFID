import React, { useState, useEffect } from "react";
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function SetupAttendance() {
    const { user } = useAuthContext()

    const [coursesTaught, setCoursesTaught] = useState([])

    const [selectedCourse, setSelectedCourse] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    // Get teacher Username from Local Storage

    const storedUser = localStorage.getItem("user")
    let username = "";
    if (storedUser) {
        const user = JSON.parse(storedUser);
        username = user.username;
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/teacher/getTeacherCourses/${username}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                console.log(res)
                setCoursesTaught(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(startTime)
        axios.put("http://localhost:4000/teacher/setupAttendance", {
            selectedCourse,
            startTime,
            endTime
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>

            {
                coursesTaught.map((course) => (

                    <>
                        <select
                            name="selectedCourse"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >

                            <option default value="">-- SELECT COURSE --</option>
                            <option
                                value={course._id}
                            >
                                {course.code}
                            </option>

                        </select >

                        <form onSubmit={handleSubmit}>

                            <label htmlFor="startTime">Start Time: </label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />

                            <label htmlFor="endTime">Set End Time: </label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />

                            <button>SETUP</button>
                        </form>
                    </>

                ))
            }

        </div>
    )
}