import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { goToFeedPage } from "../Routes/coordinator"
import { ThemeProvider } from "styled-components"

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

    const getPosts = async () => {

        let recentPosts

        await axios.get(path, { headers })
            .then(response => {
                recentPosts = (response.data).reverse() //Lógica para aparecer primeiro os posts mais recentes
                // setPosts(recentPosts)
            })
            .catch(error => console.log(error))

        return recentPosts

    }

    const getPostById = async (id) => {

        let post

        await axios.get(path, { headers })
            .then(response => {
                const recentPosts = (response.data).reverse() //Lógica para aparecer primeiro os posts mais recentes

                post = recentPosts.find((post) => post.id === id)
            })
            .catch(error => console.log(error))

            return post
    }

    const createPost = async (body) => {

        await axios.post(path, body, { headers })
            .catch(error => {
                console.log(error.response.data[0].message)
                throw new Error(error.response.data[0].message)
            })
    }

    const deletePost = async () => {

        await axios.delete(path, { headers })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data[0].message)
            })
    }

    const likePost = async (body) => {

        await axios.put(path, body, { headers })
            .catch(error => {
                throw new Error("Não é possível dar like e dislike no própio post")
            }

            )
    }

    const verifyLike = async () => {

        let likeSituation

        await axios.get(path, { headers })
            .then(response => {
                likeSituation = response.data.likeSituation
            }
            )
            .catch(error => console.log(error.response.data))

            return likeSituation
    }

    const getComments = async () => {

        let comments

           await axios.get(path, {headers})
                .then(response => {
                    comments = response.data
                })
                .catch(error => {
                    console.log(error)
                })

        return comments
    }

    const createComment = async (body) => {

        await axios.post(path, body, { headers })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response.data[0].message)
            })
    }

    const likeComment = async (body) => {

        await axios.put(path, body, { headers })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                throw new Error(error.response.data)
            })
    }

    return { addData, logInData, getPosts, getPostById, createPost, deletePost, likePost, verifyLike, getComments, createComment, likeComment }
}