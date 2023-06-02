import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";


import "../../styles/Admin/Complaints.css"


export default function Complaints() {

    const { user } = useAuthContext()
    const [complaints, setComplaints] = useState([])

    const [isCompleted, setIsCompleted] = useState(false)

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

    function handleComplete(complaintId, username) {

        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.put(`http://localhost:4000/admin/updateComplaint/${complaintId}/${username}/${actionBy}`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

            .then((res) => {
                if (res.status === 200) {
                    setComplaints((prevComplaints) =>
                        prevComplaints.map((complaint) =>
                            complaint._id === complaintId
                                ? { ...complaint, isCompleted: !complaint.isCompleted }
                                : complaint
                        )
                    );
                }
            })

            .catch(err => console.log(err))
    }

    function handleDelete(complaintId) {
        const storedUser = localStorage.getItem("user")
        let actionBy = "";
        if (storedUser) {
            const user = JSON.parse(storedUser);
            actionBy = user.username;
        }

        axios.delete(`http://localhost:4000/admin/deleteComplaint/${complaintId}/${actionBy}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                if (res.status == 200) {
                    setComplaints((prevComplaint) => prevComplaint.filter((complaint) => complaint._id !== complaintId)
                    )
                }
            })
            .catch(err => {
                console.log(err)
                setIsCompleted(false)
            })
    }

    return (
        <>
            <h2>Complaints</h2>
            <select>
                <option value="">All</option>
                <option value="">Completed</option>
                <option value="">Pending</option>
            </select>
            <div className="complaints-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-header">Username</th>
                            <th className="table-header">Class Missed</th>
                            <th className="table-header">Date Missed</th>
                            <th className="table-header">Reason</th>
                            <th className="table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint._id}>
                                <td className="table-cell">{complaint.username}</td>
                                <td className="table-cell">{complaint.selectedCourse}</td>
                                <td className="table-cell">{complaint.dateMissed}</td>
                                <td className="table-cell">{complaint.reason}</td>
                                <td className="table-cell action">
                                    <input
                                        type="checkbox"
                                        name="isCompleted"
                                        value={complaint.isCompleted}
                                        onClick={() => handleComplete(complaint._id, complaint.username)}
                                    />

                                    <img className="complaint-delete-icon"
                                        src="../images/delete.png"
                                        alt="delete"
                                        onClick={() => handleDelete(complaint._id)}
                                    />

                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}