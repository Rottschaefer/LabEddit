import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { goToFeedPage } from "../Routes/coordinator"

export const useRequestData = (path) => {

    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem("token"))

    const headers = {
        authorization: token
    }


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


        // if (localStorage.getItem("token")) {
        //     body.token = JSON.parse(localStorage.getItem("token"))
        // }

        axios.post(path, body)
            .then(response => {
                setIsLoading(true)
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    goToFeedPage(navigate)
                    setIsLoading(false)
                    setBadRequest(false)
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

    const getPosts = (setPosts) => {

        // let token
        // if (localStorage.getItem("token")) {
        //     token = JSON.parse(localStorage.getItem("token"))
        // }

        const headers = {
            Authorization: token
        }

        axios.get("http://localhost:3003/posts", { headers })
            .then(response => {
                const recentPosts = (response.data).reverse() //Lógica para aparecer primeiro os posts mais recentes
                setPosts(recentPosts);
            })
            .catch(error => console.log(error))
    }

    const createPost = (body, setPosts, setBadRequest, setErrorMessage, setIsLoading, setText) => {

        // const token = JSON.parse(localStorage.getItem("token"))

        // const headers = {
        //     Authorization: token
        // }

        axios.post(path, body, { headers })
            .then(response => {
                setBadRequest(false)
                getPosts(setPosts)
                setText("")
            })
            .catch(error => {
                console.log(error.response.data[0].message)
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
            })
    }

    const likePost = (body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, arrowColor, inversedArrowColor) => {

        //Preciso tirar a lógica daqui, estudar sincronicidade do react

        axios.put(path, body, { headers })
            .then(response => {

                if (body.like) {
                    if (arrowColor === "#90ee90") {
                        setArrowColor("#FBFBFB")
                    }
                    else {
                        setArrowColor("#90ee90")
                        setInversedArrowColor("#FBFBFB")
                    }
                }

                if (!body.like) {
                    if (inversedArrowColor === "#ff726f") {
                        setInversedArrowColor("#FBFBFB")
                    }
                    else {
                        setInversedArrowColor("#ff726f")
                        setArrowColor("#FBFBFB")
                    }
                }

                // setArrowColor(color)
                // setInversedArrowColor("#FBFBFB")
                getPosts(setPosts) // Para atualizar o número de likes na hora da ação
            }
            )
            .catch(error => {
                setErrorMessage(error.response.data)
                setTimeout(() => setErrorMessage(false), 3000)
            }

            )


    }

    const verifyLike = (setReaction, reaction, setArrowColor, setInversedArrowColor) => {

        axios.get(path, { headers })
            .then(response => {
                setReaction(response.data.likeSituation)
                console.log(reaction)

                if (response.data.likeSituation === 1) {
                    setArrowColor("#90ee90")
                }

                if (response.data.likeSituation === 0) {
                    setInversedArrowColor("#ff726f")
                }
            }
            )
            .catch(error => console.log(error.response.data))
    }

    return { addData, logInData, getPosts, createPost, likePost, verifyLike }
}