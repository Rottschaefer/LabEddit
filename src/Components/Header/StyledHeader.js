import { styled } from "styled-components";
import { LabenuLogo } from "../LabenuLogo/LabenuLogo"


export const StyledHeader = styled.header`
position: relative;
display: flex;
width: 100vw;
height: 11vw;
max-height: 100px;
justify-content: end;
align-items: center;
background-color: #EDEDED;
`

export const StyledLogoConteiner = styled.div`
margin-top: 10px;
margin-bottom: 0px; //pra zerar o 11px de margem que vieram do componente
position: absolute;
left: 50%;
transform: translateX(-50%);
`

export const StyledHeaderText = styled.p`
cursor: pointer;
font-family: 'Noto Sans';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 25px;
/* text-align: center; */
justify-self: end;
color: #4088CB;
padding-right:29px;
`
