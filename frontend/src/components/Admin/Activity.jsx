import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Activity() {

    const { user } = useAuthContext()

    const [activities, setActivities] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/admin/activity", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res)
                setActivities(res.data)
            })

            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <div>
            <h2>Recent Activities</h2>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Action</th>
                        <th>Action By</th>
                    </tr>
                </thead>

                <tbody>
                    {activities && activities.map((activity) => (
                        <tr>
                            <td>{activity.timestamp}</td>
                            <td>{activity.action}</td>
                            <td>{activity.actionBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}