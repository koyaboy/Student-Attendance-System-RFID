import React, { useState } from "react";

export default function ManageTeachers() {

    const [title, setTitle] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState("Computer Science")
    const [role, setRole] = useState("T")

    function handleSubmit(e) {
        e.preventDefault()
    }
    return (
        <>
            <h2>Manage Teachers</h2>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <select
                    name="title"
                >
                    <option value="Prof">Prof</option>
                    <option value="Dr">Dr</option>
                    <option value="Mr">Mr</option>
                </select>



                <label>First Name:</label>
                <input
                    type="text"
                    name="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                />


                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}

                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}

                />

                <label>Department:</label>
                <input
                    type="text"
                    name="department"
                    value={department}
                />

                <label>Role:</label>
                <input
                    type="text"
                    name="role"
                    value={role}
                />

                <button>Submit</button>


            </form>
        </>

    )
}