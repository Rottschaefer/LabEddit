import { StyledArrow, StyledArrows, StyledCommentCount, StyledCommentInfo, StyledDislikeArrow, StyledExtraInfo, StyledId, StyledLikeCount, StyledPostConteiner, StyledSVG, StyledText } from "./StyledPost"
import { ReactComponent as ArrowSVG } from "../../Assets/arrow.svg";
import { ReactComponent as CommentBaloon } from "../../Assets/commentBaloon.svg";
import { useState } from "react";

export const Post = ({name, content, likes}) => {

    const [arrowColor, setArrowColor] = useState("#FBFBFB")
    // const [arrowBorderColor, setArrowBorderColor] = useState("wheat")

    // #FBFBFB

    const handleReaction = () => {
        if (arrowColor === "#90ee90") {
            setArrowColor("#FBFBFB")
        }
        else {
            setArrowColor("#90ee90")
        }

    }

    return (
        <StyledPostConteiner>
            <StyledId>Enviado por: {name}</StyledId>
            <StyledText>{content}</StyledText>
            <StyledExtraInfo>
                <StyledArrows>
                    <ArrowSVG onClick={handleReaction} color={arrowColor} stroke='#6F6F6F' />
                    <StyledLikeCount>{likes}</StyledLikeCount>
                    <StyledDislikeArrow>
                        <ArrowSVG onClick={handleReaction} color={arrowColor} stroke='#6F6F6F' />
                    </StyledDislikeArrow>
                </StyledArrows>
                <StyledCommentInfo>
                    <CommentBaloon/>
                    <StyledCommentCount>300</StyledCommentCount>
                </StyledCommentInfo>
            </StyledExtraInfo>
        </StyledPostConteiner>
    )
}