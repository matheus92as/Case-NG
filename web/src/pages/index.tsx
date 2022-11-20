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
import { FormEvent, useEffect, useState } from 'react'
import ModalLogin from '../components/ModalLogin'
import ButtonGeneric from '../components/ButtonGeneric'
import { api } from '../lib/axios'
import useForm from '../hooks/useForm'
import moment from 'moment'


export default function Home() {
  const [update, setUpdate] = useState(false)
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
  const [viewIN, setViewIN] = useState(true)
  const [viewOUT, setViewOUT] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [order, setOrder] = useState("desc")
  const { formulario, onChange, limpaInputs } = useForm({ receiverName: "" });


  function mascaraMoeda(event: any) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s:any)=> /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
    setInputValue(maskCurrency(digitsFloat))
  }

  function maskCurrency(valor: any, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
  }

  async function getUserInfs() {
    if (token !== '') {
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const user = await api.get('/me');
        const userDBInfs = user.data.user;
        setUserInf(userDBInfs);

        if (userDBInfs.userAccountId === undefined) {
          const account = await api.get(`/users/balance/user/${userDBInfs.username}`);
          const accountDBInfs: number = account.data.balance;
          setBalance(accountDBInfs);
        } else {
          const account = await api.get(`/users/balance/${userDBInfs.userAccountId}`);
          const accountDBInfs: number = account.data.balance;
          setBalance(accountDBInfs);
        }

        const cashOut = await api.get(`/transactions/cash-out/${userDBInfs.userAccountId}`);
        const cashOutDBInfs = cashOut.data;
        setCashOutInf(cashOutDBInfs);

        const cashIn = await api.get(`/transactions/cash-in/${userDBInfs.userAccountId}`);
        const cashInDBInfs = cashIn.data;
        setCashInInf(cashInDBInfs);

      } catch (error: any) {
        alert(error.response.data.message)
      }
    }
  }

  async function makeTransfer(event: FormEvent) {
    event.preventDefault()

    const valueToCents = inputValue.replace(/[^\d]+/g, '')
    const value: number = Number(valueToCents)

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await api.post(`/transactions/cash-out/${userInf.username}/${formulario.receiverName}`, { value: value });

      alert(response.data);
      limpaInputs();
      setCardViewTranfs(false)
      setUpdate(!update)

    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  let allTransfs = cashOutInf.concat(cashInInf)
  console.log(allTransfs);

  interface Users {
    username: string
  }

  interface Credited {
    users: Users[]
  }

  interface Debited {
    username: string
  }

  interface TransfInfs {
    createdAt: Date
    creditedAccountId: string
    debitedAccountId: string
    id: string
    value: number
    creditedAccount?: Credited
    debitedAccount?: Debited
  }

  function sortFunction(a: any, b: any) {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();

    let result = dateA < dateB

    if (order === "asc") {
      result = dateA > dateB
    }

    return (result) ? 1 : -1;
  };

  function checkView(transf: TransfInfs) {
    let result

    if ((viewIN === true) && (viewOUT === false)) {
      result = transf.debitedAccount
    } else if (viewIN === false && viewOUT === true) {
      result = transf.creditedAccount
    } else if (viewIN === true && viewOUT === true) {
      result = transf
    } else if (viewIN === false && viewOUT === false) {
      result = undefined
    }

    return result
  }

  const cardsViagens = allTransfs
    .sort(sortFunction)
    .filter(checkView)
    .map((transf: TransfInfs) => {
      return (
        <>
          {transf.creditedAccount !== undefined ?
            <div className='listItem'>
              <div className='transfSymbol'>
                OUT
              </div>
              <div className='nameStatus'>
                <h2>{transf.creditedAccount && transf.creditedAccount.users[0].username}</h2>
                <span>enviado</span>
              </div>
              <div className='dateValue'>
                <h2>{moment(transf.createdAt).format("DD/MM/YYYY")}</h2>
                <span>-R$ {(transf.value / 100).toFixed(2)}</span>
              </div>
            </div>
            :
            <div className='listItem'>
              <div className='transfSymbol'>
                IN
              </div>
              <div className='nameStatus'>
                <h2>{transf.debitedAccount && transf.debitedAccount.username}</h2>
                <span>recebido</span>
              </div>
              <div className='dateValue'>
                <h2>{moment(transf.createdAt).format("DD/MM/YYYY")}</h2>
                <span>R$ {(transf.value / 100).toFixed(2)}</span>
              </div>
            </div>
          }
        </>
      )
    })

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
  }, [token, update])

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
                inSignup={inSignup}
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible} />
              :
              <ButtonHeader
                text='Logout'
                logedIn={logedIn}
                setLogedIn={setLogedIn}
                inSignup={inSignup}
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
                        <h1>🙈<strong>🙈.🙈</strong></h1>
                      }
                    </H.Balance>
                    <H.StatusBottons>
                      <ButtonGeneric text='transferir' setCardViewTranfs={setCardViewTranfs} />
                      <ButtonGeneric text='extrato' setViewTranfs={setViewTranfs} />
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
                    <form onSubmit={makeTransfer}>
                      <label>valor:</label>
                      <input
                        id='money'
                        type='text'
                        name='value'
                        className="money form-control"
                        placeholder='R$ 00,0'
                        value={inputValue}
                        onInput={mascaraMoeda}
                        required
                      />
                      <label>para:</label>
                      <input
                        placeholder='usuário a receber'
                        name='receiverName'
                        type='text'
                        value={formulario.receiverName}
                        onChange={onChange}
                        required
                      />
                      <ButtonGeneric text='Confirmar' />
                    </form>
                  </H.TransferCard>
                  : null
                }
                <H.CardTranfs id='extract'>
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
                      {viewIN === true ?
                        <button onClick={() => setViewIN(!viewIN)}>IN</button>
                        :
                        <button className='halfOpacity' onClick={() => setViewIN(!viewIN)}>IN</button>
                      }
                      /
                      {viewOUT === true ?
                        <button onClick={() => setViewOUT(!viewOUT)}>OUT</button>
                        :
                        <button className='halfOpacity' onClick={() => setViewOUT(!viewOUT)}>OUT</button>
                      }
                    </div>
                  </div>
                  {viewTranfs === true ?
                    <>
                      {order === "desc" ?
                        <p className='orderSet' onClick={() => setOrder("asc")}>🡣</p>
                        :
                        <p className='orderSet' onClick={() => setOrder("desc")}>🡡</p>}
                      <div className='list'>
                        {cardsViagens}
                      </div>
                    </>
                    : null
                  }
                </H.CardTranfs>
              </H.SecondSection>
            </>
            : null
          }
        </>
      }
    </H.MainContainer>
  )
}