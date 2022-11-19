import * as B from '../styles/buttonGenericStyle'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  text: string
  setCardViewTranfs?: Dispatch<SetStateAction<boolean>>
}

const ButtonGeneric = (props: Props) => {
  return (
    <>
      {props.text === "transferir" ?
        <B.MainContainer onClick={() => props.setCardViewTranfs(true)} >
          <button><a href='#transaction'>{props.text}</a></button>
          <div></div>
        </B.MainContainer>
        :
        <>
          {props.text === "Confirmar" ?
            <B.WhiteBG>
              <button>{props.text}</button>
              <div></div>
            </B.WhiteBG>
            :
            <B.MainContainer>
              <button>{props.text}</button>
              <div></div>
            </B.MainContainer>
          }
        </>
      }
    </>
  )
}

export default ButtonGeneric