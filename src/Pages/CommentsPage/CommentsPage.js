import { useParams } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { Post } from "../../Components/Post/Post"
import { StyledAnswerButton, StyledCommentPage, StyledDiv, StyledTextArea } from "./StyledCommentsPage"
import { useRequestData } from "../../Hooks/UseRequestData"
import { useEffect, useState } from "react"

export const CommentsPage = () => {

    const postMock = {
        creator: { name: "" },
        id: "",
        content: "",
        likes: 0,
        dislikes: 0
    }

    const [post, setPost] = useState(postMock)

    console.log(post)


    const { id } = useParams()


    const path = `http://localhost:3003/comments/${id}`
    const path2 = `http://localhost:3003/posts`

    const { getComments } = useRequestData(path)
    const { getPostById } = useRequestData(path2)

    useEffect( () => {
        getPostById(setPost, id)
        getComments()
    }, [])

    

   


    return (
        <>
            <Header text="Logout" />
            <StyledCommentPage>
                {/* <Post display="flex" post={post}/>
                <StyledTextArea placeholder="Adicionar comentário" />
                <StyledAnswerButton>Responder</StyledAnswerButton>
                <StyledDiv />
                <Post display="none" post={post} /> */}
                {post !== postMock ? (
                    <>
                        <Post setPosts={setPost} display="flex" post={post}/>
                        <StyledTextArea placeholder="Adicionar comentário" />
                        <StyledAnswerButton>Responder</StyledAnswerButton>
                        <StyledDiv />
                        <Post display="none" post={post} />
                    </>
                ) : (
                    <p>Só um instante...estamos trazendo os comentários!</p>
                )}
            </StyledCommentPage>
        </>
    )
}