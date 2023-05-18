import { styled } from "styled-components";

export const StyledLabenuLogo = styled.div`
/* margin: auto; */
display: flex;
margin-bottom: 11px;
rotate: ${props => props.isActive ? "-45deg" : "0"};

transition: all 2s;
`

export const StyledQuarter = styled.div`
width: ${props=>props.size};
height: ${props=>props.size};
max-width: 42px;
max-height: 42px;
background-color: ${props => props.color};
border-top-left-radius: ${props => props.leftRadius};
border-bottom-right-radius: ${props => props.rightRadius};
rotate: ${props => {
        if (props.isActive) {
            switch (props.color) {
                case "#FE7E02":
                    return "0deg";
                case "#F9B24E":
                    return "90deg";
                case "#45525B":
                    return "180deg";
            }
        }
    }
    };

    transition: all 2s;

`