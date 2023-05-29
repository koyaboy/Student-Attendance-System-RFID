import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";


import "../../styles/Admin/Complaints.css"


export default function Complaints() {

    const { user } = useAuthContext()
    const [complaints, setComplaints] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/admin/complaints", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then((res) => {
                setComplaints(res.data)
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="complaints-table">
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Username</th>
                        <th className="table-header">Class Missed</th>
                        <th className="table-header">Date Missed</th>
                        <th className="table-header">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                        <tr key={complaint._id}>
                            <td className="table-cell">{complaint.username}</td>
                            <td className="table-cell">{complaint.selectedCourse}</td>
                            <td className="table-cell">{complaint.dateMissed}</td>
                            <td className="table-cell">{complaint.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}