import { styled } from "styled-components"

export const StyledFeedPage = styled.main`
display: flex;
flex-direction: column;
align-items: center;

opacity: ${props=> props.fade ? "1" : "0"};
transition: all 1s;
`

export const StyledNewPostSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 330px;
`

export const StyledTextArea = styled.textarea`
resize: none;
display: flex;
align-items: start;
width: 69.5vw;
max-width: 100%;
height: 131px;
padding: 18px;
margin-top: 32px;

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

export const StyledPlaceHolder = styled.p`
position: absolute;
top: 5%;
left: 12.5%;

font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 23px;

color: black;
z-index: 3;
`

// export const StyledDiv = styled.div`
// position: relative;
// width:78vw;
// max-width: 364px;
// height: 131px;
// background-color: black;

// /* background: #EDEDED; */
// border-radius: 12px;
// border: none;
// z-index: -1;
// margin-top: -131px;
// `

export const StyledCheckConteiner = styled.div`
width: 78vw;
display: flex;
align-items: center;
gap: 11px;
`


export const StyledPostButton = styled.button`
cursor: pointer;
width: 78vw;
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
margin-top: 12px;

/* opacity: ${props=>props.isLoading ? "0.5" : "1"}; */

transition: all 1s;
`

export const StyledDiv = styled.div`
background-image: linear-gradient(to right, #FF6489, #F9B24E);
width: 78vw;
max-width: 363px;
height: 1px;
margin-top: 32px;
margin-bottom: 26px;
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
margin-bottom: 0px;
`

export const StyledDeletedMessage = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 5vh;
position: sticky;
top: 0;
color: red;
background-color: #EDEDED;
text-align: center;
font-family: 'Noto Sans';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 19px;

margin-top: -20px;
margin-bottom: 7px;
`