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

        // console.log("User:", user);


        axios.post("http://localhost:4000/login", {
            username,
            password,
        })

            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // save the user to local storage
                    localStorage.setItem("user", JSON.stringify(res.data));

                    //update the Auth Context
                    dispatch({ type: "LOGIN", payload: res.data })

                    setIsLoading(false)
                    navigate("/")
                }
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.error)
            });
    }

    return { login, isLoading, error }
}