import { StyledArrow, StyledArrows, StyledCommentCount, StyledCommentInfo, StyledDislikeArrow, StyledErrorMessage, StyledExtraInfo, StyledId, StyledLikeCount, StyledPostConteiner, StyledSVG, StyledText, StyledTopDiv, StyledTrashCan } from "./StyledPost"
import { ReactComponent as ArrowSVG } from "../../Assets/arrow.svg";
import { ReactComponent as InversedArrowSVG } from "../../Assets/arrow copy.svg";
import { ReactComponent as CommentBaloon } from "../../Assets/commentBaloon.svg";
import { useEffect, useState } from "react";
import { useRequestData } from "../../Hooks/UseRequestData";
import { useLocation, useNavigate } from "react-router-dom";
import { goToCommentsPage } from "../../Routes/coordinator";
import {BsTrashFill} from "react-icons/bs"
import { PATH } from "../../Assets/constants";

//Colocar animação de Loading no botão

export const Post = ({ setPosts, display, post, posts, setDeletedMessage }) => {

    const navigate = useNavigate()

    const [reaction, setReaction] = useState(2) //estado que define a cor das setas de like e dislike
    const [localLikes, setLocalLikes] = useState(post.likes) //estado que muda o número de likes temporariamente até que putra requisição seja feita
    const [errorMessage, setErrorMessage] = useState(false)
    const [fade, setFade] = useState(false)
    const [commentsNumber, setCommentsNumber] = useState(0)


    const path = `${PATH}/posts/${post.id}/like`

    const path2 = `${PATH}/posts/${post.id}/verify-like`

    const path3 = `${PATH}/posts/${post.id}`

    const path4 = `${PATH}/comments/${post.id}`

    const location = useLocation()


    if(location.pathname.includes("/feed/")){
        post.creator.isTheCreator = false //Na página de comments, a opção de deletar post não deve aparecer
    }


    const { likePost } = useRequestData(path)
    const { verifyLike } = useRequestData(path2)
    const { deletePost } = useRequestData(path3)
    const { getComments } = useRequestData(path4)

    //Ver se o usuário já reagiu(like ou dislike) em algum post no primeiro carregamento

    useEffect(() => {
        handleInitialization()
    }, [posts])

    const handleInitialization = async () => {
            setReaction(2)
            const likeSituation = await verifyLike()
            setReaction(likeSituation)
            setFade(true)

            const comments = await getComments()

            setCommentsNumber(comments.length)

    }


    const handleLike = async () => {

        try {
            const body = { like: true }

            await likePost(body)

           
            let likes = localLikes

            if (reaction === 1) {
                setReaction(2)
                
                likes--

                setLocalLikes(likes)
            }
            else{
                setReaction(1)

                likes++

                setLocalLikes(likes)
            }
        }
        catch (error) {
            setErrorMessage(error.message)
            setTimeout(() => setErrorMessage(false), 3000)
        }

    }



    const handleDislike = async () => {

        try {
            const body = { like: false }

            await likePost(body, setPosts)

            let likes = localLikes

            if (reaction === 0) {
                setReaction(2)
            }
            else if(reaction === 1){
                likes--
                setLocalLikes(likes)
                setReaction(0)
            }
            else {
                setReaction(0)
            }
        }
        catch (error) {
            setErrorMessage(error.message)
            setTimeout(() => setErrorMessage(false), 3000)
        }

    }

    const handleDeletePost = async() =>{

        await deletePost()

        setDeletedMessage("Post Deletado :)")

        setTimeout(()=>setDeletedMessage(""),4000)

        const updatedPosts = posts.filter((seenPost)=>seenPost.id !== post.id)

        setPosts(updatedPosts)
    }




    return (
        <>
            <StyledPostConteiner fade = {fade}>
                <StyledTopDiv>
                <StyledId>Enviado por: {post.creator?.name ??  post.name}</StyledId>
                {post.creator.isTheCreator && <StyledTrashCan onClick={handleDeletePost}/>}
                </StyledTopDiv>
                
                <StyledText>{post.content}</StyledText>
                <StyledExtraInfo>
                    <StyledArrows>
                        <ArrowSVG onClick={handleLike} color={reaction === 1 ? "#90ee90" : "#FBFBFB"} stroke='#6F6F6F' />
                        <StyledLikeCount>{localLikes}</StyledLikeCount>
                        <StyledDislikeArrow>
                            <InversedArrowSVG onClick={handleDislike} color={reaction === 0 ? "#ff726f" : "#FBFBFB"} stroke='#6F6F6F' />
                        </StyledDislikeArrow>
                    </StyledArrows>
                    <StyledCommentInfo display={display} onClick={() => goToCommentsPage(navigate, post.id)}>
                        <CommentBaloon />
                        <StyledCommentCount>{commentsNumber}</StyledCommentCount>
                    </StyledCommentInfo>
                </StyledExtraInfo>
            </StyledPostConteiner>
            {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
        </>
    )
}