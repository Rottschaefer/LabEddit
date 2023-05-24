import { useEffect, useState } from "react"
import { Header } from "../../Components/Header/Header"
import { StyledCheckBox, StyledCheckConteiner, StyledContinueButton, StyledHighlightText, StyledLabel, StyledSignUpForm, StyledSignUpInput, StyledSignUpPage, StyledTitle, StyledWarning } from "./StyledSignUpPage"
import { useRequestData } from "../../Hooks/UseRequestData"
import { goToFeedPage } from "../../Routes/coordinator"
import { useNavigate } from "react-router-dom"
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Loader } from "../../Components/Loader/Loader"
import { PATH } from "../../Assets/constants"


export const SignUpPage = () => {

    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])
    //Fade-in quando trocar pra esta página

    const [isLoading, setIsLoading] = useState(false)//Estado que define a animação de carregando no botão

    const [badRequest, setBadRequest] = useState(false) //Estado que define se aparecerá uma mensagem de erro ou não
    const [errorMessage, setErrorMessage] = useState("")//Mensagem de erro que irá aparecer

    //Controle dos inputs abaixo
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }



    const path = `${PATH}/signup`

    const { addData } = useRequestData(path)

    const createNewUser = () => {
        if(!name || !password || !email){
            setBadRequest(true)
            setErrorMessage("É preciso preencher todos os campos para se cadastrar")
        }
        else{
        setBadRequest(false)
        setIsLoading(true)
        const body = ({ name, password, email })
        addData(body, setIsLoading, setErrorMessage, setBadRequest)
    
    }
    }




    return (
        <>
            <Header fade={fade} text="Entrar"/>
            <StyledSignUpPage fade={fade}>
                <StyledTitle>Olá, boas vindas ao LabEddit ;)</StyledTitle>
                <StyledSignUpForm>
                    <StyledSignUpInput onChange={handleName} type="text" id="name" name="name" placeholder="Apelido" />
                    <StyledSignUpInput onChange={handleEmail} type="text" id="email" name="email" placeholder="E-mail" />
                    <StyledSignUpInput onChange={handlePassword} type="password" id="password" name="password" placeholder="Senha" />
                </StyledSignUpForm>
                <StyledWarning color="black">Ao continuar, você concorda com o nosso <StyledHighlightText>Contrato de usuário</StyledHighlightText> e <StyledHighlightText>nossa Política de Privacidade</StyledHighlightText></StyledWarning>
                <StyledCheckConteiner>
                    <StyledCheckBox type="checkbox" />
                    <StyledLabel>Eu concordo em receber emails sobre coisas legais no Labeddit</StyledLabel>
                </StyledCheckConteiner>
                {badRequest && <StyledWarning color="red" margin="-10px">{errorMessage}</StyledWarning>}
                <StyledContinueButton onClick={createNewUser} isLoading={isLoading}>{isLoading ? "Só um instante..." : "Cadastrar"}
                </StyledContinueButton>
                
            </StyledSignUpPage>
        </>
    )
}