import * as M from '../styles/modalLoginStyle'
import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import { api } from '../lib/axios'
import ButtonGeneric from './ButtonGeneric'
import Link from 'next/link'
import useForm from '../hooks/useForm'

interface Props {
    loginVisible: boolean
    setLogedIn: Dispatch<SetStateAction<boolean>>
    setLoginVisible: Dispatch<SetStateAction<boolean>>
}

const ModalLogin = (props: Props) => {
    const { formulario, onChange, limpaInputs } = useForm({ username: "", password: "" });

    const clickFora = (event: any) => {
        let modal = document.getElementById("modal");
        if (!modal?.contains(event.target)) {
            props.setLoginVisible(false)
        }
    }

    async function signIn(event: FormEvent) {
        event.preventDefault()

        try {
            const response = await api.post('/users/login', formulario);
            const token = response.data;
            localStorage.setItem("token", token);

            alert('Acesso liberado!');
            limpaInputs();
            props.setLoginVisible(false)
            props.setLogedIn(true)

        } catch (error) {
            alert("Não foi possivel acessar a conta")   
        }
    }

    return (
        <M.Background onClick={clickFora}>
            <M.MainContainer id='modal'>
                <button className='close' onClick={() => props.setLoginVisible(false)}>X</button>
                <h1>Bom te ver de novo!</h1>
                <form onSubmit={signIn} >
                    <input
                    placeholder='Nome de usuário(a)'
                    name='username'
                    type='text'
                    value={formulario.username}
                    onChange={onChange}
                    required
                    />
                    <input
                    placeholder='Senha'
                    name='password'
                    type='password'
                    value={formulario.password}
                    onChange={onChange}
                    required
                    />
                    <ButtonGeneric text='Entrar'/>
                </form>
                <span>
                    Ainda não tem conta?  Faça seu cadastro <Link href="/signup">aqui!</Link>
                </span>
            </M.MainContainer>
        </M.Background>
    )
}

export default ModalLogin