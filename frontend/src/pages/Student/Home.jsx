import React from "react";
import "../../styles/Student/Home.css"
import { useState, useEffect } from "react";
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Home() {

    const [courses, setCourses] = useState([])
    const { user } = useAuthContext()


    useEffect(() => {
        axios.get(`http://localhost:4000/courses/${user.username}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setCourses(res.data)
                console.log(res.data)
                console.log(courses);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            {courses.map((course) => (
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
        </>
    );
}