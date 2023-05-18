import { useState } from "react"
import { Header } from "../../Components/Header/Header"
import {StyledCheckBox, StyledCheckConteiner, StyledContinueButton, StyledHighlightText, StyledLabel, StyledSignUpForm, StyledSignUpInput, StyledSignUpPage, StyledTitle, StyledWarning} from "./StyledSignUpPage"


export const SignUpPage = () => {

     

    return(
        <>
        <Header/>
        <StyledSignUpPage>
            <StyledTitle>Olá, boas vindas ao LabEddit ;)</StyledTitle>
            <StyledSignUpForm>
                <StyledSignUpInput type="text" id="name" name="name"placeholder="Apelido"/>
                <StyledSignUpInput type="text" id="email" name="email" placeholder="E-mail"/>
                <StyledSignUpInput type="password" id="password" name="password" placeholder="Senha"/>
            </StyledSignUpForm>
            <StyledWarning>Ao continuar, você concorda com o nosso <StyledHighlightText>Contrato de usuário</StyledHighlightText> e <StyledHighlightText>nossa Política de Privacidade</StyledHighlightText></StyledWarning>
            <StyledCheckConteiner>
            <StyledCheckBox type="checkbox"/>
            <StyledLabel>Eu concordo em receber emails sobre coisas legais no Labeddit</StyledLabel>
            </StyledCheckConteiner>
            <StyledContinueButton>Cadastrar</StyledContinueButton>
        </StyledSignUpPage>
        </>
    )
}