import { useEffect, useState } from "react"
import { LabenuLogo } from "../../Components/LabenuLogo/LabenuLogo"
import { useNavigate } from "react-router-dom"

import { StyledContinueButton, StyledDiv, StyledForm, StyledInput, StyledLoginPage, StyledSignUpButton, StyledSubTitle, StyledTitle } from "./StyledLoginPage"
import { goToSignUpPage } from "../../Routes/coordinator"

export const LoginPage = () => {

    const [fade, setFade] = useState(false)

    useEffect(()=>{
        setFade(true)
    },[])
    //Fade-in quando trocar pra esta página

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }


    return (
        <StyledLoginPage fade={fade}>
            <LabenuLogo size="9vw" time="4000"/>
            <StyledTitle>LabEddit</StyledTitle>
            <StyledSubTitle>O projeto de rede social da Labenu</StyledSubTitle>

            <StyledForm>
                <StyledInput onChange={handleEmail} type="text" id="email" name="email" placeholder="E-mail" />
                <StyledInput onChange={handlePassword} type="password" id="password" name="password" placeholder="Senha" />
            </StyledForm>

            <StyledContinueButton>Continuar</StyledContinueButton>
            <StyledDiv />
            <StyledSignUpButton onClick={() => goToSignUpPage(navigate)}>Crie uma conta!</StyledSignUpButton>
        </StyledLoginPage>

    )
}