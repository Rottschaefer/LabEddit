import { ReactComponent as ArrowSVG } from "../../Assets/arrow.svg";
import { ReactComponent as InversedArrowSVG } from "../../Assets/arrow copy.svg";
import { ReactComponent as CommentBaloon } from "../../Assets/commentBaloon.svg";
import { useEffect, useState } from "react";
import { useRequestData } from "../../Hooks/UseRequestData";
import { useNavigate } from "react-router-dom";
import { goToCommentsPage } from "../../Routes/coordinator";
import { StyledArrows, StyledCommentCount, StyledCommentInfo, StyledDislikeArrow, StyledErrorMessage, StyledExtraInfo, StyledId, StyledLikeCount, StyledPostConteiner, StyledText } from "./StyledComment";

//Colocar animação de Loading no botão

export const Comment = ({ setPosts, display, comment, post }) => { //Preferi criar outro componente para evitar complexidade de código

    const navigate = useNavigate()

    const [reaction, setReaction] = useState(2) //estado que define a cor das setas de like e dislike
    const [localLikes, setLocalLikes] = useState(comment.likes) //estado que muda o número de likes temporariamente até que outra requisição seja feita
    const [errorMessage, setErrorMessage] = useState(false)

    // const path = `http://localhost:3003/posts/${post.id}/like`

    // const path2 = `http://localhost:3003/posts/${post.id}/verify-like`


    // const { likePost } = useRequestData(path)
    // const { verifyLike } = useRequestData(path2)

    //Ver se o usuário já reagiu(like ou dislike) em algum post no primeiro carregamento
    // useEffect(() => {
    //     verifyLike(setReaction, reaction)
    // }, [])


    const handleLike = async () => {

        // try {
        //     const body = { like: true }

        //     await likePost(body)

           
        //     let likes = localLikes

        //     // setErrorMessage(false)
        //     if (reaction === 1) {
        //         setReaction(2)
                
        //         likes--

        //         setLocalLikes(likes)
        //     }
        //     else{
        //         setReaction(1)

        //         likes++

        //         setLocalLikes(likes)
        //     }
        // }
        // catch (error) {
        //     setErrorMessage(error.message)
        //     setTimeout(() => setErrorMessage(false), 3000)
        // }

    }



    const handleDislike = async () => {

        // try {
        //     const body = { like: false }

        //     await likePost(body, setPosts)

        //     let likes = localLikes

        //     if (reaction === 0) {
        //         setReaction(2)
        //     }
        //     else if(reaction === 1){
        //         likes--
        //         setLocalLikes(likes)
        //         setReaction(0)
        //     }
        //     else {
        //         setReaction(0)
        //     }
        // }
        // catch (error) {
        //     setErrorMessage(error.message)
        //     setTimeout(() => setErrorMessage(false), 3000)
        // }

    }




    return (
        <>
            <StyledPostConteiner>
                <StyledId>Enviado por: {comment.name}</StyledId>
                <StyledText>{comment.content}</StyledText>
                <StyledExtraInfo>
                    <StyledArrows>
                        <ArrowSVG onClick={handleLike} color={reaction === 1 ? "#90ee90" : "#FBFBFB"} stroke='#6F6F6F' />
                        <StyledLikeCount>{localLikes}</StyledLikeCount>
                        {/* <StyledLikeCount>{dislikes}</StyledLikeCount> */}
                        <StyledDislikeArrow>
                            <InversedArrowSVG onClick={handleDislike} color={reaction === 0 ? "#ff726f" : "#FBFBFB"} stroke='#6F6F6F' />
                        </StyledDislikeArrow>
                    </StyledArrows>
                </StyledExtraInfo>
            </StyledPostConteiner>
            {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
        </>
    )
}