import React from "react";
import "../../styles/Student/ComplaintsForm.css"
export default function ComplaintsForm() {
    return (
        <div className="container">
            <h2 className="title">WE ARE HERE TO ASSIST YOU !!</h2>
            <p className="complaints"><strong>Please lodge complaints within 48 hours of attendance issue</strong></p>

            <div className="form">
                <form>
                    <label htmlFor="classMissed">Class Missed</label>
                    <br />
                    <select
                        name="classMissed"
                        id="classMissed"
                    >
                        <option value="CSC 424">CSC 424</option>
                    </select>
                    <br />
                    <br />

                    <label htmlFor="dateMissed">Date Missed</label>
                    <br />
                    <input
                        type="date"
                        id="dateMissed"
                        name="dateMissed"
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
                </form>
            </div>

        </div>
    )
}