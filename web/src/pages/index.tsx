import Image from 'next/image'
import * as H from '../styles/indexStyle'
import ngLogo from '../assets/NG-CASH_Logo_white.png'
import bgImage from '../assets/line_pattern.png'
import appImage from '../assets/home-ngcash-app.png'
import appStore from '../assets/appstore.png'
import googlePlay from '../assets/googleplay.png'
import ButtonHeader from '../components/ButtonHeader'
import { useState } from 'react'
import ModalLogin from '../components/ModalLogin'



export default function Home() {
  const [logedIn, setLogedIn] = useState(false)
  const [inSignup, setInSignup] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

  return (
    <H.MainContainer>
      <H.FirstSection>
        <H.BgLimit>
          <Image src={bgImage} alt="bg" fill priority/>
        </H.BgLimit>
        <H.Header>
          <Image src={ngLogo} alt="Logo NG.CASH" width={120} />
          {logedIn === false ?
            <ButtonHeader
              text='Login'
              logedIn={logedIn}
              inSignup={inSignup}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible} />
            :
            <ButtonHeader
              text='Logout'
              logedIn={logedIn}
              inSignup={inSignup}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
            />
          }
        </H.Header>
        {loginVisible === false ? null :
          <ModalLogin
            loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
          />}
        {logedIn === false ?
          <H.Content>
            <H.TextDiv>
              <h1>
                A CARTEIRA DA NOVA GERAÇÃO.
              </h1>
              <h2>
                É para todas as idades!
              </h2>
              <div>
                <Image src={googlePlay} alt="googleplay" />
                <Image src={appStore} alt="appstore" />
              </div>
            </H.TextDiv>
            <H.ImgDiv>
              <Image src={appImage} alt="Telas do App" priority/>
            </H.ImgDiv>
          </H.Content>
          :
          null
        }

      </H.FirstSection>
    </H.MainContainer>
  )
}