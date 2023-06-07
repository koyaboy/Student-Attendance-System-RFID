import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../styles/Student/Home.css"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function TeacherHome() {

    const { user } = useAuthContext()

    const [coursesTaught, setCoursesTaught] = useState([])

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

    return (
        <div>
            {coursesTaught &&

                coursesTaught.map((course) => (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-code">{course.code}</p>
                        </div>
                        <div className="card-body">
                            <p className="course-description">{course.description}</p>
                            <p className="course-details">Instructor:
                                {course.instructor.map((instructor) => (
                                    <span key={instructor._id}>{instructor.title}. {instructor.firstname} {instructor.lastname}</span>
                                )

                                )}

                            </p>
                        </div>
                    </div>
                ))}
        </div>
    )
}