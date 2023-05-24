import { useParams } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { Post } from "../../Components/Post/Post"
import { StyledAnswerButton, StyledCommentPage, StyledDiv, StyledTextArea } from "./StyledCommentsPage"
import { useRequestData } from "../../Hooks/UseRequestData"
import { useEffect, useState } from "react"
import { Comment } from "../../Components/Comment/Comment"
import { PATH } from "../../Assets/constants"

export const CommentsPage = () => {

    const postMock = {
        creator: { name: "" },
        id: "",
        content: "",
        likes: 0,
        dislikes: 0
    }

    const [post, setPost] = useState(postMock)

    const [comments, setComments] = useState([])

    const [isLoading, setIsLoading] = useState(true)


    //Controle do input de comentário
    const [content, setContent] = useState("")

    const handleData = (setFunction) => (event) => {
        setFunction(event.target.value)
    }

    // console.log(post)


    const { id } = useParams()


    const path = `${PATH}/comments/${id}`
    const path2 = `${PATH}/posts`

    const { getComments, createComment } = useRequestData(path)
    const { getPostById } = useRequestData(path2)

    useEffect(() => {
        handleInitialization()
    }, [])


    const handleInitialization = async () => {
        try {
            const comments = await getComments()
            const post = await getPostById(id)
            setPost(post)
            setComments(comments.reverse())
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
        }


    }


    const handlePostComment = async () => {
        try {

            const body = { content }

            await createComment(body)

            setContent("")

            const comments = await getComments()

            setComments(comments.reverse())


        }
        catch { }
    }





    return (
        <>
            <Header text="Logout" />
            <StyledCommentPage>
                {/* <Post display="flex" post={post}/>
                <StyledTextArea placeholder="Adicionar comentário" />
                <StyledAnswerButton>Responder</StyledAnswerButton>
                <StyledDiv />
                <Post display="none" post={post} /> */}
                {(post !== postMock && comments) ? (
                    <>
                        <Post setPosts={setPost} display="flex" post={post} />
                        <StyledTextArea placeholder="Adicionar comentário" value={content} onChange={handleData(setContent)} />
                        <StyledAnswerButton onClick={handlePostComment}>Responder</StyledAnswerButton>
                        <StyledDiv />
                        {/* {isLoading ?  <p>Erro</p> : comments.map((comment)=>{return <Post display="none" post={comment} />}) } */}
                        {comments.map((comment) => { return <Comment display="none" comment={comment} post={post}/> })}
                    </>
                ) : (
                    <p>Só um instante...estamos trazendo os comentários!</p>
                )}
            </StyledCommentPage>
        </>
    )
}