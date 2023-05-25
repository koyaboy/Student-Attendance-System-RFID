import React from "react";
import "../styles/Login.css"
import axios from "axios";
import { useLogin } from "../hooks/useLogin"

export default function Login() {

    const [data, setData] = React.useState({
        username: "",
        password: "",
    })

    const { login, error, isLoading } = useLogin()

    function handleChange(event) {
        const { name, value } = event.target
        setData(function (prevData) {
            return (
                {
                    ...prevData,
                    [name]: value
                }
            )
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await login(data.username, data.password)
    }

    return (
        <div className="login">
            <div className="form">
                <div className="error-message">
                    {error && error}
                </div>
                <div className="cu-logo-container">
                    <img src="../images/Login/cu_logo.png"
                        alt="cu-logo"
                        className="cu-logo" />
                </div>

                <div className="login--heading">
                    <h3 className="welcome-back">Welcome Back</h3>
                    <img src="../images/Login/book_1.png"
                        alt="book"
                        className="book" />
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        className="login--input" />
                    <br />
                    <br />

                    <input type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        className="login--input" />
                    <br />
                    <br />

                    <div className="login--btn--container">
                        <button disabled={isLoading} className="login--btn">Log in</button>
                    </div>


                </form>
            </div>

        </div>
    )
}