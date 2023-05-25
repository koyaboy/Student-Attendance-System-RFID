import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import axios from "axios";

export default function ViewAttendance() {
    const [data, setData] = useState("");
    const { user } = useAuthContext(

    )
    axios.get("http://localhost:4000/viewattendance", {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
        .then(res => {
            setData(res.data.msg);
        })
        .catch(err => console.log(err))

    console.log(data)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {/* <th>Course Code</th>
                        <th>Times Present</th>
                        <th>Times Expected</th>
                        <th>Percentage</th>
                        <th></th> */}
                        <th>{data}</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </>
    )
}