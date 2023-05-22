import { StyledArrow, StyledArrows, StyledCommentCount, StyledCommentInfo, StyledDislikeArrow, StyledErrorMessage, StyledExtraInfo, StyledId, StyledLikeCount, StyledPostConteiner, StyledSVG, StyledText } from "./StyledPost"
import { ReactComponent as ArrowSVG } from "../../Assets/arrow.svg";
import { ReactComponent as InversedArrowSVG } from "../../Assets/arrow copy.svg";
import { ReactComponent as CommentBaloon } from "../../Assets/commentBaloon.svg";
import { useEffect, useState } from "react";
import { useRequestData } from "../../Hooks/UseRequestData";

//Colocar animação de Loading no botão

export const Post = ({name, content, likes, dislikes, id, setPosts}) => {

    const [arrowColor, setArrowColor] = useState("#FBFBFB")
    const [inversedArrowColor, setInversedArrowColor] = useState("#FBFBFB")
    const [reaction, setReaction] = useState(2)
    const [errorMessage, setErrorMessage] = useState(false)

    // const [likes, setLikes] = useState(likes)

    const path = `http://localhost:3003/posts/${id}/like`

    const path2 = `http://localhost:3003/posts/${id}/verify-like`


    const {likePost} = useRequestData(path)
    const {verifyLike} = useRequestData(path2)

    //Ver se o usuário já reagiu(like ou dislike) em algum post no primeiro carregamento
    useEffect(()=>{
        verifyLike(setReaction, reaction , setArrowColor, setInversedArrowColor)
    },[])

    let x 

    // useEffect(()=>{console.log(errorMessage); x = errorMessage}, [errorMessage])
   

    const handleLike = () => {

        const body = {like: true}

        likePost(body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, arrowColor, inversedArrowColor)

        
        if(!errorMessage){
    
        // if (arrowColor === "#90ee90") {
        //     setArrowColor("#FBFBFB")
        //     // const body = {like: true}
        //     // likePost(body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, "#FBFBFB")
        // }
        // else {
            
        //     // const body = {like: true}
        //     // likePost(body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, "#90ee90")
        //     setInversedArrowColor("#FBFBFB")
        //     setArrowColor("#90ee90")

            
        // }
    }
    }

      

    const handleDislike = () => {

        const body = {like: false}
    
        likePost(body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, arrowColor, inversedArrowColor)


        // if (inversedArrowColor === "#ff726f") {
        //     setInversedArrowColor("#FBFBFB")
        //     const body = {like: false}
        //     likePost(body, setPosts, setErrorMessage, setArrowColor, setInversedArrowColor, arrowColor, inversedArrowColor)
        // }
        // else {
        //     setInversedArrowColor("#ff726f")
        //     const body = {like: false}
        //     likePost(body, setPosts)
        //     setArrowColor("#FBFBFB")
        // }
    }



    return (
        <>
        <StyledPostConteiner>
            <StyledId>Enviado por: {name}</StyledId>
            <StyledText>{content}</StyledText>
            <StyledExtraInfo>
                <StyledArrows>
                    <ArrowSVG onClick={handleLike} color={arrowColor} stroke='#6F6F6F' />
                    <StyledLikeCount>{likes}</StyledLikeCount>
                    {/* <StyledLikeCount>{dislikes}</StyledLikeCount> */}
                    <StyledDislikeArrow>
                        <InversedArrowSVG onClick={handleDislike} color={inversedArrowColor} stroke='#6F6F6F' />
                    </StyledDislikeArrow>
                </StyledArrows>
                <StyledCommentInfo>
                    <CommentBaloon/>
                    <StyledCommentCount>300</StyledCommentCount>
                </StyledCommentInfo>
            </StyledExtraInfo>
        </StyledPostConteiner>
        {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
        </>
    )
}