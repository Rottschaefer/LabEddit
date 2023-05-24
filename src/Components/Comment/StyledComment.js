import { styled } from "styled-components";

export const StyledPostConteiner = styled.div`
width: 78vw;
max-width: 364px;
height: auto;
display: flex;
flex-direction: column;
align-items: flex-start;
border: 1px solid black;

margin-bottom: 10px;

background: #FBFBFB;
border: 1px solid #E0E0E0;
border-radius: 12px;

`

export const StyledId = styled.p`
width: auto;
height: 16px;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
text-align: left;

margin-left: 10px;
margin-bottom: 0px;
margin-top: 9px;


color: #6F6F6F;
`

export const StyledText = styled.p`
width: 72vw;
max-width: 335px;
height: auto;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 23px;
text-align: left;

margin-left: 10px;
margin-top: 18px;

`

export const StyledSVG = styled.object`
  color: green;
`

export const StyledDislikeArrow = styled.div`
rotate: 180deg;
` 

export const StyledArrows = styled.div`
width: 85px;
height: 20px;
display: flex;
justify-content: space-between;
align-items: center;
border: 0.796748px solid #ECECEC;
border-radius: 28px;
gap: 14px;
padding: 5px;
margin-left: 10px;
margin-bottom: 9px;
`

export const StyledLikeCount = styled.p`
margin: 0;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 700;
font-size: 10px;
line-height: 12px;
text-align: center;

color: #6F6F6F;

` 

export const StyledCommentInfo = styled.div`
display: ${props=>props.display};//Se for na página de comentários, a aba de info dos comentários não deve aparecer
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4.66667px;
gap: 8px;

width: 65px;
height: 20px;
left: 119px;
top: 130px;

border: 0.793333px solid #ECECEC;
border-radius: 28px;
margin-left: 10px;
margin-bottom: 9px;
`

export const StyledExtraInfo = styled.div`
display: flex;
align-items: center;
/* flex-direction: row; */
width: auto;

`

export const StyledCommentCount = styled.p`
margin: 0;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 12px;
text-align: center;

color: #6F6F6F;

` 

export const StyledErrorMessage = styled.p`
text-align: center;
font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 19px;

width: 78vw;
max-width: 363px;
color: red;
margin-top: 0px;
`