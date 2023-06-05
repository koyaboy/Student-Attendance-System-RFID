import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {


    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch, user } = useAuthContext()

    const navigate = useNavigate()


    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        // Get user role from local storage

        axios.post("http://localhost:4000/login", {
            username,
            password,
        })

            .then(res => {
                console.log(res);
                if (res.status === 200) {

                    const role = res.data.role;

                    localStorage.setItem("user", JSON.stringify(res.data));

                    //update the Auth Context
                    dispatch({ type: "LOGIN", payload: res.data })

                    if (role == "S") {
                        navigate("/")
                    }

                    if (role == "T") {
                        navigate("/teacher")
                    }

                    if (role == "A") {
                        navigate("/admin")
                    }

                    setIsLoading(false)

                }
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.error)
            });
    }

    return { login, isLoading, error }
}