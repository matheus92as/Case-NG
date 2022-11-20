import Image from 'next/image'
import * as H from '../styles/signupStyle'
import ngLogo from '../assets/NG-CASH_Logo_white.png'
import bgImage from '../assets/line_pattern.png'
import star from '../assets/white-star.png'
import ButtonHeader from '../components/ButtonHeader'
import { FormEvent, useState } from 'react'
import ButtonGeneric from '../components/ButtonGeneric'
import useForm from '../hooks/useForm'
import { api } from '../lib/axios'
import { useRouter } from 'next/router'


export default function Signup() {
    const [logedIn, setLogedIn] = useState(false)
    const [inSignup, setInSignup] = useState(true)
    const { formulario, onChange, limpaInputs } = useForm({ username: "", password: "" });
    const router = useRouter()

    async function signUp(event: FormEvent) {
        event.preventDefault()

        try {
            const response = await api.post('/users', formulario);
            const token = response.data;
            localStorage.setItem("token", token);

            alert('Conta criada com sucesso!');
            limpaInputs();
            router.push("/")

        } catch (error:any) {
            alert(error.response.data.message)

        }
    }

    return (
        <H.MainContainer>
            <H.FirstSection>
                <H.BgLimit>
                    <Image src={bgImage} alt="bg" fill priority />
                </H.BgLimit>
                <H.Header>
                    <Image src={ngLogo} alt="Logo NG.CASH" width={120} />
                    <ButtonHeader
                        text='Voltar'
                        logedIn={logedIn}
                        inSignup={inSignup}
                    />
                </H.Header>
                <H.Content>
                    <H.TextDiv>
                        <h1>
                            É muito facil fazer parte dessa transformação!
                        </h1>
                        <h2>
                            Basta escolher como quer ser chamado, e sua melhor senha.
                        </h2>
                        <form onSubmit={signUp}>
                            <input
                                placeholder='Nome de usuário(a)'
                                name='username'
                                type='text'
                                minLength={3}
                                value={formulario.username}
                                onChange={onChange}
                                required
                            />
                            <input
                                placeholder='Senha'
                                name='password'
                                type='password'
                                minLength={8}
                                value={formulario.password}
                                onChange={onChange}
                                required
                            />
                            <ButtonGeneric text='Entrar' />
                        </form>
                    </H.TextDiv>
                    <H.CardDiv>
                        <div className='list'>
                            <h1>
                                Aproveite todos os nossos benefícios
                            </h1>
                            <div className='listItens'>
                                <Image src={star} alt="white star" />
                                <p>Conta grátis</p>
                            </div>
                            <div className='listItens'>
                                <Image src={star} alt="white star" />
                                <p>Cartão físico grátis</p>
                            </div>
                            <div className='listItens'>
                                <Image src={star} alt="white star" />
                                <p>Cartão virtual grátis</p>
                            </div>
                            <div className='listItens'>
                                <Image src={star} alt="white star" />
                                <p>Mesada programadas</p>
                            </div>
                        </div>
                    </H.CardDiv>
                </H.Content>
            </H.FirstSection>
        </H.MainContainer>
    )
}