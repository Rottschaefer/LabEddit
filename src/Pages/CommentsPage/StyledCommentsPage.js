import { styled } from "styled-components";

export const StyledCommentPage = styled.main`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 28px;
`

export const StyledTextArea = styled.textarea`
resize: none;
display: flex;
align-items: start;
width: 69.5vw;
max-width: 330px;
padding: 18px;
margin-top: 12px;

background: #EDEDED;
border-radius: 12px;
border: none;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 23px;

color: #6F6F6F;
`

export const StyledAnswerButton = styled.button`
cursor: pointer;
width: 80vw;
max-width: 365px;
height: 51px;
border-radius: 12px;
border: none;
background-image: linear-gradient(to right, #FF6489, #F9B24E);
font-family: 'Noto Sans', sans-serif;
font-size: 18px;
line-height: 25px;
font-weight: 700;
color: white;
margin-top: 8px;

/* opacity: ${props=>props.isLoading ? "0.5" : "1"}; */

transition: all 1s;
`

export const StyledDiv = styled.div`
background-image: linear-gradient(to right, #FF6489, #F9B24E);
width: 78vw;
max-width: 363px;
height: 1px;
margin-top: 12px;
margin-bottom: 36px;
`