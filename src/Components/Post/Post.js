import { StyledArrow, StyledArrows, StyledCommentCount, StyledCommentInfo, StyledDislikeArrow, StyledErrorMessage, StyledExtraInfo, StyledId, StyledLikeCount, StyledPostConteiner, StyledSVG, StyledText } from "./StyledPost"
import { ReactComponent as ArrowSVG } from "../../Assets/arrow.svg";
import { ReactComponent as InversedArrowSVG } from "../../Assets/arrow copy.svg";
import { ReactComponent as CommentBaloon } from "../../Assets/commentBaloon.svg";
import { useEffect, useState } from "react";
import { useRequestData } from "../../Hooks/UseRequestData";
import { useNavigate } from "react-router-dom";
import { goToCommentsPage } from "../../Routes/coordinator";

//Colocar animação de Loading no botão

export const Post = ({ setPosts, display, post }) => {

    const navigate = useNavigate()

    const [reaction, setReaction] = useState(2) //estado que define a cor das setas de like e dislike
    const [errorMessage, setErrorMessage] = useState(false)

    const path = `http://localhost:3003/posts/${post.id}/like`

    const path2 = `http://localhost:3003/posts/${post.id}/verify-like`


    const { likePost } = useRequestData(path)
    const { verifyLike } = useRequestData(path2)

    //Ver se o usuário já reagiu(like ou dislike) em algum post no primeiro carregamento
    useEffect(() => {
        verifyLike(setReaction, reaction)
    }, [])


    const handleLike = async () => {

        try {
            const body = { like: true }

            await likePost(body, setPosts)

            if (reaction === 1) {
                setReaction(2)
            }
            else {
                setReaction(1)
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

            if (reaction === 0) {
                setReaction(2)
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




    return (
        <>
            <StyledPostConteiner>
                <StyledId>Enviado por: {post.creator.name}</StyledId>
                <StyledText>{post.content}</StyledText>
                <StyledExtraInfo>
                    <StyledArrows>
                        <ArrowSVG onClick={handleLike} color={reaction === 1 ? "#90ee90" : "#FBFBFB"} stroke='#6F6F6F' />
                        <StyledLikeCount>{post.likes}</StyledLikeCount>
                        {/* <StyledLikeCount>{dislikes}</StyledLikeCount> */}
                        <StyledDislikeArrow>
                            <InversedArrowSVG onClick={handleDislike} color={reaction === 0 ? "#ff726f" : "#FBFBFB"} stroke='#6F6F6F' />
                        </StyledDislikeArrow>
                    </StyledArrows>
                    <StyledCommentInfo display={display} onClick={() => goToCommentsPage(navigate, post.id)}>
                        <CommentBaloon />
                        <StyledCommentCount>300</StyledCommentCount>
                    </StyledCommentInfo>
                </StyledExtraInfo>
            </StyledPostConteiner>
            {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
        </>
    )
}