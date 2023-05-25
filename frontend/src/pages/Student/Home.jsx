import React from "react";
import "../../styles/Student/Home.css"

export default function Home() {
    return (

        <div className="card">
            <div className="card-header">
                <h3 className="course-title">Course Title</h3>
                <p className="course-code">Course Code</p>
            </div>
            <div className="card-body">
                <p className="course-description">Course Description</p>
                <p className="course-details">Instructor: John Doe</p>
            </div>
        </div>
    )
}