import { styled } from "styled-components"

export const StyledFeedPage = styled.main`
display: flex;
flex-direction: column;
align-items: center;

opacity: ${props=> props.fade ? "1" : "0"};
transition: all 1s;
`