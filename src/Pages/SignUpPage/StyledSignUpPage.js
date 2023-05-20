import { styled } from "styled-components";


export const StyledSignUpPage = styled.main`
display: flex;
flex-direction: column;
align-items: center;
opacity: ${props=> props.fade ? "1" : "0"};

transition: all 1s;
`

export const StyledTitle = styled.p`
font-family: 'IBM Plex Sans';
font-style: normal;
font-weight: 700;
font-size: 33px;
line-height: 43px;
width: 78vw;
margin-top: 29px;

color: #373737;
`

export const StyledSignUpForm = styled.form`
display: flex;
flex-direction: column;
gap: 8px;
margin-top: 42vw;
`

export const StyledSignUpInput = styled.input`
border: 1px solid #D5D8DE;
border-radius: 4px;
width: 78vw;
max-width: 363px;
height: 60px;
display: flex;
flex-direction: column;

font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 22px;
color: #323941;
padding-left: 16px;
`

export const StyledWarning = styled.p`
text-align: center;
font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 19px;

width: 78vw;
max-width: 363px;
color: ${props=>props.color};
margin-bottom: ${props=>props.margin ? props.margin : "17px"}
`

// .attrs({ type: 'checkbox' })

export const StyledHiddenCheckBox = styled.input`

background-color: white;
`

export const StyledCheckBox = styled.input`
width: 16px;
  height: 16px;
  border: 1px solid #C4C4C4;
border-radius: 2px;
  margin-right: 8px;
`

export const StyledHighlightText = styled.span`
color: #4088CB;
`

export const StyledLabel = styled.p`
width: 72vw;
max-width: 373px;

font-family: 'Noto Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 19px;
`

export const StyledCheckConteiner = styled.div`
width: 78vw;
display: flex;
align-items: center;
gap: 11px;
`


export const StyledContinueButton = styled.button`
cursor: pointer;
width: 78vw;
max-width: 365px;
height: 51px;
border-radius: 27px;
border: none;
background-image: linear-gradient(to right, #FF6489, #F9B24E);
font-family: 'Noto Sans', sans-serif;
font-size: 18px;
line-height: 25px;
font-weight: 700;
color: white;
margin-top: 28px;

opacity: ${props=>props.isLoading ? "0.5" : "1"};

transition: all 1s;
`