import React from "react";
import { useState, useEffect } from "react"
import "../../styles/Student/ComplaintsForm.css"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ComplaintsForm() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("")
    const [dateMissed, setDateMissed] = useState("")
    const [reason, setReason] = useState("")

    const [successful, setSuccessful] = useState(false)
    const [error, setError] = useState("")

    const { user } = useAuthContext()
    const username = user.username

    useEffect(() => {
        axios.get(`http://localhost:4000/courses/${username}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => setCourses(res.data))
            .catch(error => console.log(error))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`http://localhost:4000/complaintsform/${username}`, {
            username,
            selectedCourse,
            dateMissed,
            reason
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setSuccessful(true)
                console.log(res);
                setSelectedCourse("")
                setDateMissed("")
                setReason("")
            })
            .catch(err => {
                setSuccessful(false)
                setError("Something went wrong")
            })
    }

    return (
        <div className="container">
            <h2 className="title">WE ARE HERE TO ASSIST YOU !!</h2>
            <p className="complaints"><strong>Please lodge complaints within 48 hours of attendance issue</strong></p>

            <div className="complaintsform">
                <form onSubmit={handleSubmit}>
                    <div className="message">
                        {successful && <div>Complaint sent successfully</div>}
                        {error && <div>Error occurred</div>}
                    </div>

                    <label htmlFor="classMissed">Class Missed</label>
                    <br />
                    <select
                        name="classMissed"
                        id="classMissed"
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        value={selectedCourse}
                    >
                        <option value="">-- SELECT COURSE --</option>
                        {/* <option value="CSC 424">CSC 424</option> */}
                        {courses.map((course) =>
                            <option value={course.code} key={course._id}>
                                {course.code}
                            </option>
                        )}
                    </select>
                    <br />
                    <br />

                    <label htmlFor="dateMissed">Date Missed</label>
                    <br />
                    <input
                        type="date"
                        id="dateMissed"
                        name="dateMissed"
                        onChange={(e) => setDateMissed(e.target.value)}
                        value={dateMissed}
                    />
                    <br />
                    <br />

                    <label htmlFor="Reason">Reason</label>
                    <br />
                    <textarea
                        name="Reason"
                        id="Reason"
                        cols="25"
                        rows="10"
                        onChange={(e) => setReason(e.target.value)}
                        value={reason}
                    />
                    <br />
                    <br />

                    <label
                        htmlFor="photoEvidence"
                        className="photoEvidence"
                    >
                        Photo Evidence
                    </label>
                    <br />
                    <input
                        type="file"
                        id="photoEvidence"
                        name="photoEvidence"
                    />
                    <br />
                    <button className="submit">SUBMIT</button>

                    <div className="message">
                        {successful && <div>Complaint sent successfully</div>}
                        {error && <div>Error occurred</div>}
                    </div>

                </form>
            </div>

        </div>
    )
}