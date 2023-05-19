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


export const SignUpPage = () => {

    const navigate = useNavigate()

    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])
    //Fade-in quando trocar pra esta página

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [badRequest, setBadRequest] = useState(false)
    const [token, setToken] = useState(undefined)

    // const [clicked, setClicked] = useState(false)


    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }


    // const {data, addData} = useRequestData(path, body);

    const path = "http://localhost:3003/users/signup"

    const { addData } = useRequestData(path)

    const createNewUser = () => {
        if(!name || !password || !email){
            setBadRequest(true)
        }
        else{
        setBadRequest(false)
        setIsLoading(true)
        const body = ({ name, password, email })
        setToken(addData(body, setIsLoading))
        // localStorage.setItem("token", JSON.stringify(token))
        // setTimeout(()=>{setIsLoading(false)}, 500)
        

        // if (token) {
        //     localStorage.setItem("token", JSON.stringify(token))
        //     goToFeedPage(navigate)
        // }
    }
    }

    useEffect(()=>{
        if(token){
        localStorage.setItem("token", JSON.stringify(token))
        goToFeedPage(navigate)
        }
    },[token])


    return (
        <>
            <Header fade={fade} />
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
                {badRequest && <StyledWarning color="red" margin="-10px">É preciso preencher todos os campos para se cadastrar</StyledWarning>}
                <StyledContinueButton onClick={createNewUser} isLoading={isLoading}>{isLoading ? "Só um instante..." : "Cadstastrar"}
                </StyledContinueButton>
                
            </StyledSignUpPage>
        </>
    )
}