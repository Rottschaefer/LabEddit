import { useNavigate } from "react-router-dom"
import { LabenuLogo } from "../LabenuLogo/LabenuLogo"
import { StyledHeader, StyledHeaderText, StyledLogoConteiner } from "./StyledHeader"
import { goToLogInPage } from "../../Routes/coordinator"

export const Header = () => {

    const navigate = useNavigate()

    return (
        <StyledHeader>
            <StyledLogoConteiner>
                <LabenuLogo size="3vw" time="10000" />
            </StyledLogoConteiner>
            <StyledHeaderText onClick={()=>goToLogInPage(navigate)}>Entrar</StyledHeaderText>
        </StyledHeader>
    )
}