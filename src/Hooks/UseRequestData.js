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

    const getPosts = async (setPosts) => {

        // let token
        // if (localStorage.getItem("token")) {
        //     token = JSON.parse(localStorage.getItem("token"))
        // }

        const headers = {
            Authorization: token
        }

        await axios.get("http://localhost:3003/posts", { headers })
            .then(response => {
                const recentPosts = (response.data).reverse() //Lógica para aparecer primeiro os posts mais recentes
                setPosts(recentPosts)

                    // if (id) {
                    //     const post = recentPosts.find((post) => post.id === id)
                    //     setPosts(post)
                    // }
                    ;
            })
            .catch(error => console.log(error))
    }

    const getPostById = (setPost, id) => {

        const headers = {
            Authorization: token
        }

        axios.get("http://localhost:3003/posts", { headers })
            .then(response => {
                const recentPosts = (response.data).reverse() //Lógica para aparecer primeiro os posts mais recentes

                const post = recentPosts.find((post) => post.id === id)
                setPost(post)
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

    const likePost = async (body, setPosts, id) => {

        await axios.put(path, body, { headers })
            .then(response => {
                    getPosts(setPosts) // Para atualizar o número de likes na hora da ação 
            }
            )
            .catch(error => {
                throw new Error("Não é possível dar like e dislike no própio post")
            }

            )
    }

    const verifyLike = (setReaction, reaction, setArrowColor, setInversedArrowColor) => {

        axios.get(path, { headers })
            .then(response => {
                setReaction(response.data.likeSituation)
            }
            )
            .catch(error => console.log(error.response.data))
    }

    const getComments = () => {
        axios.get(path)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return { addData, logInData, getPosts, getPostById, createPost, likePost, verifyLike, getComments }
}