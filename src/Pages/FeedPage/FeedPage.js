import { useEffect, useState } from "react"
import { Header } from "../../Components/Header/Header"
import { useRequestData } from "../../Hooks/UseRequestData"
import { Post } from "../../Components/Post/Post"
import { StyledDiv, StyledErrorMessage, StyledFeedPage, StyledInput, StyledNewPostSection, StyledPlaceHolder, StyledPostButton, StyledTextArea } from "./StyledFeedPage"

export const FeedPage = () => {

    const path = "http://localhost:3003/posts"
    const { getPosts, createPost } = useRequestData(path)

    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])


    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts(setPosts)
       
    }, [])

    const [text, setText] = useState("")

    const handleData = (setFunction) => (event) => {
        setFunction(event.target.value)
    }

    const handleCreatePost = () => {
        const body = { content: text }
        createPost(body, setPosts, setBadRequest, setErrorMessage, setIsLoading, setText)
        // getPosts(setPosts)
    }

    const [badRequest, setBadRequest] = useState(false) //Estado que define se aparecerá uma mensagem de erro ou não
    const [errorMessage, setErrorMessage] = useState("")//Mensagem de erro que irá aparecer
    const [isLoading, setIsLoading] = useState(false)//Estado que define a animação de carregando no botão


    return (
        <StyledFeedPage fade={fade}>
            <Header text="Logout" />
            <StyledNewPostSection>
                <StyledTextArea placeholder="Escreva seu post..." value={text} onChange={handleData(setText)} />
                {badRequest && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
                <StyledPostButton onClick={handleCreatePost}>Postar</StyledPostButton>
                <StyledDiv />
            </StyledNewPostSection>
            {posts.map((post) => { return <Post display= "flex" setPosts={setPosts} post={post}/> })}
        </StyledFeedPage>
    )
}