import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { goToFeedPage } from "../Routes/coordinator"

export const useRequestData = (path) => {

    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()


    const addData = (body, setIsLoading, setErrorMessage, setBadRequest) => {

        //Função para adicionar usuário(sign up), já que o custom hook só pode ser ativado após o clique do botão e não pode ser usado dentro de uma função comum que ficaria dentro do componente SignUp. 

        axios.post(path, body)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    goToFeedPage(navigate)
                }
                setIsLoading(false);
                setBadRequest(false)
            }
            )
            .catch(error => {
                console.log(error.response.data[0].message);
                setBadRequest(true);
                setErrorMessage(error.response.data[0].message);
                setIsLoading(false)
            })

        // return data
    }

    const logInData = (body, setIsLoading, setErrorMessage, setBadRequest, loadingTimes) => {


        if (localStorage.getItem("token")) {
            body.token = JSON.parse(localStorage.getItem("token"))
        }

        axios.post(path, body)
            .then(response => {
                setIsLoading(true)
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    goToFeedPage(navigate)
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    goToFeedPage(navigate)
                }
            })
            .catch(error => {
                //Se é a primeira requisição que veio com o useEffect, o erro não deve ser mostrado
                if (loadingTimes > 0) {
                    setIsLoading(true)
                    setBadRequest(true);
                    if (error.response.data[0].message) {
                        setErrorMessage(error.response.data[0].message)
                        setIsLoading(false)
                    }
                    else {
                        setErrorMessage(error.response.data)
                        setIsLoading(false)
                    };
                }

            })

        return error
    }

    return { addData, logInData }
}