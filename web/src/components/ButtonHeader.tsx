import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import * as B from '../styles/buttonHeaderStyle'

interface Props {
  text: string
  logedIn: boolean
  setLogedIn: Dispatch<SetStateAction<boolean>>
  inSignup: boolean
  loginVisible: boolean
  setLoginVisible: Dispatch<SetStateAction<boolean>>
}



const ButtonHeader = (props: Props) => {
  const logout = () =>{
    localStorage.removeItem("token")
    props.setLogedIn(false)
  }

  return (
    <>
      {props.logedIn === false ?
        <>{props.logedIn === false && props.inSignup === true ?
          <B.MainContainer>
            <Link href={'/'}>
              {props.text}
            </Link>
          </B.MainContainer>
          :
          <B.MainContainer onClick={() => props.setLoginVisible(true)}>
            {props.text}
          </B.MainContainer>
        }
        </>
        :
        <B.MainContainer onClick={logout}>
          {props.text}
        </B.MainContainer>
      }
    </>
  )
}

export default ButtonHeader