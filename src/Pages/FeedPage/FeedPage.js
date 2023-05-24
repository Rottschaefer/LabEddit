import { useEffect, useState } from "react"
import { Header } from "../../Components/Header/Header"
import { useRequestData } from "../../Hooks/UseRequestData"
import { Post } from "../../Components/Post/Post"
import { StyledDeletedMessage, StyledDiv, StyledErrorMessage, StyledFeedPage, StyledInput, StyledNewPostSection, StyledPlaceHolder, StyledPostButton, StyledTextArea } from "./StyledFeedPage"
import { PATH } from "../../Assets/constants"

export const FeedPage = () => {

    const path = `${PATH}/posts`
    
    const { getPosts, createPost } = useRequestData(path)

    const [fade, setFade] = useState(false)

    const [posts, setPosts] = useState([])


    useEffect(() => {
        handleInitialization()
    }, [])

    const handleInitialization = async () => {
        try {
            setFade(true)
            const posts = await getPosts()
            setPosts(posts)
        }
        catch (error) {
            console.log(error)
        }
    }



    // useEffect(() => {
    //     getPosts(setPosts)

    // }, [])

    const [text, setText] = useState("")

    const [deletedMessage, setDeletedMessage] = useState("")

    const handleData = (setFunction) => (event) => {
        setFunction(event.target.value)
    }

    const handleCreatePost = async () => {

        setIsLoading(true)

        try{
            setBadRequest(false)
            const body = { content: text }
            await createPost(body)
            setIsLoading(false)
            setText("")

            const updatedPosts = await getPosts()

            setPosts(updatedPosts)
        }
        catch(error){
            setBadRequest(true);
            setErrorMessage(error.message)
        }
        
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
            {deletedMessage && <StyledDeletedMessage>{deletedMessage}</StyledDeletedMessage>}
            {posts.map((post) => { return <Post display="flex" setPosts={setPosts} posts={posts} post={post} setDeletedMessage={setDeletedMessage}/> })}
        </StyledFeedPage>
    )
}