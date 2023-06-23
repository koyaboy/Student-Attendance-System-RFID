import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/Student/RegisterCourses.css"

export default function RegisterCourses() {
    const { user } = useAuthContext();
    const [courses, setCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios
            .get("http://localhost:4000/getCourses", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setCourses(res.data);

            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    function handleCheckboxChange(course) {
        const isChecked = registeredCourses.some((c) => c._id === course._id);

        if (isChecked) {
            setRegisteredCourses(registeredCourses.filter((c) => c._id !== course._id));
        } else {
            setRegisteredCourses([...registeredCourses, course]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const storedUser = localStorage.getItem("user");
        let student = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            student = user.username;
        }

        axios
            .post(
                `http://localhost:4000/registerCourses/${student}`,
                { registeredCourses },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                setSuccess(res.data.message)
                setError("")
            })
            .catch((err) => {
                console.log(err)
                setSuccess("")
                setError(err.response.data.message)
            });
    }

    return (
        <div className="register-courses-container">

            <div className="message">
                {success && <div className="message-success">{success}</div>}
                {error && <div className="message-error">{error}</div>}
            </div>
            <h2 className="register-courses-heading">Register Courses</h2>

            <form onSubmit={handleSubmit} className="register-courses-form">
                {courses &&
                    courses.map((course) => (
                        <div key={course._id} className="register-courses-checkbox">
                            <input
                                type="checkbox"
                                name="registeredCourses"
                                id={course._id}
                                value={course._id}
                                checked={registeredCourses.some((c) => c._id === course._id)}
                                onChange={() => handleCheckboxChange(course)}
                            />
                            <label htmlFor={course._id}>{course.code}</label>
                        </div>
                    ))}
                <br />

                <button type="submit" className="register-courses-button">
                    REGISTER
                </button>
            </form>
        </div>
    );
}
