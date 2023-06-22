import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";


import "../../styles/Admin/Complaints.css"


export default function Complaints() {

    const { user } = useAuthContext()
    const [complaints, setComplaints] = useState([])
    const [viewComplaints, setViewComplaints] = useState("");

    useEffect(() => {
        if (viewComplaints === "all") {
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
        }

        if (viewComplaints === "completed") {
            axios.get("http://localhost:4000/admin/complaints", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    setComplaints(res.data)
                    setComplaints((prevComplaints) =>
                        prevComplaints.filter((complaint) => complaint.isCompleted === true)
                    )
                })
                .catch(error => console.log(error))
        }

        if (viewComplaints === "pending") {
            axios.get("http://localhost:4000/admin/complaints", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    setComplaints(res.data)
                    setComplaints((prevComplaints) =>
                        prevComplaints.filter((complaint) => complaint.isCompleted === false)
                    )
                })
                .catch(error => console.log(error))
        }
    }, [viewComplaints])


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

                    axios.get("http://localhost:4000/admin/complaints", {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    })

                        .then(res => {
                            setComplaints(res.data)
                            console.log(res)
                        })

                        .catch(error => console.log(error))
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
                if (res.status === 200) {
                    console.log(res.data)
                    setComplaints((prevComplaint) => prevComplaint.filter((complaint) => complaint._id !== complaintId)
                    )
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <h2>Complaints</h2>
            <select
                name="viewComplaints"
                value={viewComplaints}
                onChange={(e) => setViewComplaints(e.target.value)}
            >
                <option default value="">-- View Complaints --</option>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <div className="complaints-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-header">Username</th>
                            <th className="table-header">Class Missed</th>
                            <th className="table-header">Date Missed</th>
                            <th className="table-header">Reason</th>
                            <th className="table-header">Photo Evidence</th>
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
                                <td className="table-cell">
                                    <a href={complaint.photoUrl}>
                                        <img className="complaint-photo" src={complaint.photoUrl} alt="complaint" />
                                    </a>

                                </td>


                                <td className="table-cell action">
                                    <input
                                        type="checkbox"
                                        name="isCompleted"
                                        checked={complaint.isCompleted}
                                        onChange={() => handleComplete(complaint._id, complaint.username)}
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