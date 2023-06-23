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
    const [photo, setPhoto] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)

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
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("selectedCourse", selectedCourse);
        formData.append("dateMissed", dateMissed);
        formData.append("reason", reason);
        formData.append("isCompleted", isCompleted);
        formData.append("photo", photo); // Append the photo to the FormData

        axios
            .post(`http://localhost:4000/complaintsform/${username}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {

                console.log(res);
                setSelectedCourse("");
                setDateMissed("");
                setReason("");
                setSuccessful(true);
                setError(false)
            })
            .catch((err) => {
                setSuccessful(false);
                setError(true);
            });
    }

    return (
        <div className="container">

            <div className="complaints-form-heading">
                <h2 className="title">WE ARE HERE TO ASSIST YOU !!</h2>
                <p className="complaints"><strong>Please lodge complaints within 48 hours of attendance issue</strong></p>
            </div>

            <div className="complaintsform">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="complaintsform-form">
                    <div className="message">
                        {successful && <div>Complaint sent successfully</div>}
                        {error && <div>Error occurred</div>}
                    </div>

                    <label htmlFor="classMissed" className="complaintsform-label">Class Missed</label>
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

                    <label htmlFor="dateMissed" className="complaintsform-label">Date Missed</label>
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

                    <label htmlFor="Reason" className="complaintsform-label">Reason</label>
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

                    <div className="photo-container">

                        <label
                            className="photo-label"
                            htmlFor="photo"
                        >
                            Photo Evidence
                        </label>

                        <input
                            type="file"
                            id="photoEvidence"
                            name="photo"
                            className="photo-input"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {/* <br /> */}
                    </div>


                    <button className="submit">SUBMIT</button>

                    <div className="message">
                        {successful && <div className="message-success">Complaint sent successfully</div>}
                        {error && <div className="message-error">Error occurred</div>}
                    </div>

                </form>
            </div>

        </div>
    )
}