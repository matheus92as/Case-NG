import Image from 'next/image'
import * as H from '../styles/indexStyle'
import ngLogo from '../assets/NG-CASH_Logo_white.png'
import bgImage from '../assets/line_pattern.png'
import appImage from '../assets/home-ngcash-app.png'
import appStore from '../assets/appstore.png'
import googlePlay from '../assets/googleplay.png'
import ButtonHeader from '../components/ButtonHeader'
import openedYey from '../assets/Icone-olho-aberto.png'
import closedYey from '../assets/Icone-olho-fechado.png'
import { useEffect, useState } from 'react'
import ModalLogin from '../components/ModalLogin'
import ButtonGeneric from '../components/ButtonGeneric'
import { api } from '../lib/axios'



export default function Home() {
  const [logedIn, setLogedIn] = useState(false)
  const [inSignup, setInSignup] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const [token, setToken] = useState('')
  const [userInf, setUserInf]: any = useState({})
  const [balance, setBalance] = useState(0)
  const [cashOutInf, setCashOutInf] = useState([])
  const [cashInInf, setCashInInf] = useState([])
  const [viewBalance, setViewBalance] = useState(true)
  const [viewTranfs, setViewTranfs] = useState(false)
  const [viewCardTranf, setCardViewTranfs] = useState(false)

  // console.log(userInf);
  // console.log(balance);
  // console.log(logedIn);
  // console.log(token);

  async function getUserInfs() {
    if (token !== '') {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const user = await api.get('/me');
        const userDBInfs = user.data.user;
        setUserInf(userDBInfs);
        console.log(userDBInfs);

        const account = await api.get(`/users/balance/${userDBInfs.userAccountId}`);
        const accountDBInfs: number = account.data.balance;
        setBalance(accountDBInfs);
        console.log(accountDBInfs);

        const cashOut = await api.get(`/transactions/cash-out/${userDBInfs.userAccountId}`);
        const cashOutDBInfs = cashOut.data;
        setCashOutInf(cashOutDBInfs);
        console.log(cashOutDBInfs);

        const cashIn = await api.get(`/transactions/cash-in/${userDBInfs.userAccountId}`);
        const cashInDBInfs = cashIn.data;
        setCashInInf(cashInDBInfs);
        console.log(cashInDBInfs);

      } catch (error) {
      }
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken !== null) {
      setToken(localToken)
      setLogedIn(true)
    };
    if (logedIn === false) {
      setUserInf({})
      setBalance(0)
      setCashOutInf([])
      setCashInInf([])
      setToken('')
    }
  }, [logedIn])

  useEffect(() => {
    if (token !== '') {
      getUserInfs()
    };
  }, [token])

  return (
    <H.MainContainer>
      {logedIn === false ?
        <H.FirstSection>
          <H.BgLimit>
            <Image src={bgImage} alt="bg" fill priority />
          </H.BgLimit>
          <H.Header>
            <Image src={ngLogo} alt="Logo NG.CASH" width={120} />
            {logedIn === false ?
              <ButtonHeader
                text='Login'
                logedIn={logedIn}
                setLogedIn={setLogedIn}
                inSignup={inSignup}
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible} />
              :
              <ButtonHeader
                text='Logout'
                logedIn={logedIn}
                setLogedIn={setLogedIn}
                inSignup={inSignup}
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
              />
            }
          </H.Header>
          {loginVisible === false ? null :
            <ModalLogin
              loginVisible={loginVisible}
              setLogedIn={setLogedIn}
              setLoginVisible={setLoginVisible}
            />}

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
              <Image src={appImage} alt="Telas do App" priority />
            </H.ImgDiv>
          </H.Content>
        </H.FirstSection>
        :
        <>
          {logedIn === true && token !== '' ?
            <>
              <H.FirstSection>
                <H.BgLimit>
                  <Image src={bgImage} alt="bg" fill priority />
                </H.BgLimit>
                <H.Header>
                  <Image src={ngLogo} alt="Logo NG.CASH" width={120} />
                  <ButtonHeader
                    text='Logout'
                    logedIn={logedIn}
                    setLogedIn={setLogedIn}
                    inSignup={inSignup}
                    loginVisible={loginVisible}
                    setLoginVisible={setLoginVisible}
                  />
                </H.Header>
                <H.UserInfos>
                  <h1 className='greetings'>
                    Olá, {userInf.username}!
                  </h1>
                  <div className='status'>
                    <H.YeyButton onClick={() => setViewBalance(!viewBalance)}>
                      {viewBalance === true ?
                        <Image src={openedYey} alt='visible' />
                        :
                        <Image src={closedYey} alt='visible' />
                      }
                    </H.YeyButton>
                    <H.Balance>
                      {viewBalance === true ?
                        <h1>R$<strong>{(balance / 100).toFixed(2)}</strong></h1>
                        :
                        <h1>__  <strong>__.__</strong></h1>
                      }
                    </H.Balance>
                    <H.StatusBottons>
                      <ButtonGeneric text='transferir' setCardViewTranfs={setCardViewTranfs} />
                      <ButtonGeneric text='extrato' />
                    </H.StatusBottons>
                  </div>
                </H.UserInfos>
              </H.FirstSection>
              <H.SecondSection>
                <H.BgLimit2>
                  <Image src={bgImage} alt="bg" fill priority />
                </H.BgLimit2>
                {viewCardTranf === true ?
                  <H.TransferCard id='transaction'>
                    <button className='close' onClick={() => setCardViewTranfs(false)}>X</button>
                    <h2>transferir ➜</h2>
                    <form >
                      <label>valor:</label>
                      <input
                        placeholder='R$ 00,0'
                        // name='username'
                        // type='text'
                        // value={formulario.username}
                        // onChange={onChange}
                        required
                      />
                      <label>para:</label>
                      <input
                        placeholder='usuário a receber'
                        // name='password'
                        // type='password'
                        // value={formulario.password}
                        // onChange={onChange}
                        required
                      />
                      <ButtonGeneric text='Confirmar' />
                    </form>
                  </H.TransferCard>
                :
                null
                }
                <H.CardTranfs>
                  <div className='viewTranfs' onClick={() => setViewTranfs(!viewTranfs)}>
                    {viewTranfs === true ?
                      <Image src={openedYey} alt='visible' />
                      :
                      <Image src={closedYey} alt='visible' />
                    }
                  </div>
                  <div className='cardHead'>
                    <h2>histórico de transações</h2>
                    <div className='inOut'>
                      <button>IN</button>
                      /
                      <button>OUT</button>
                    </div>
                  </div>
                  {viewTranfs === true ?
                    <div className='list'>
                      <div className='listItem'>
                        <div className='transfSymbol'>
                          IN
                        </div>
                        <div className='nameStatus'>
                          <h2> Jane Doe</h2>
                          <span>enviado</span>
                        </div>
                        <div className='dateValue'>
                          <h2>15/10/2022</h2>
                          <span>-R$ 20,00</span>
                        </div>
                      </div>
                    </div>
                    :
                    null
                  }
                </H.CardTranfs>
              </H.SecondSection>
            </>
            :
            null
          }
        </>
      }
    </H.MainContainer>
  )
}