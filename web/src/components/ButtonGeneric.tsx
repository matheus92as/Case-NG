import * as B from '../styles/buttonGenericStyle'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  text: string
  setCardViewTranfs?: Dispatch<SetStateAction<boolean>>
  setViewTranfs?: Dispatch<SetStateAction<boolean>>
}

const ButtonGeneric = (props: Props) => {
  return (
    <>
      {props.text === "transferir" ?
        <B.MainContainer
          onClick={() => props.setCardViewTranfs && props.setCardViewTranfs(true)} >
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
            <>
              {props.text === "extrato" ?
                <B.MainContainer
                  onClick={() => props.setViewTranfs && props.setViewTranfs(true)}>
                  <button><a href='#extract'>{props.text}</a></button>
                  <div></div>
                </B.MainContainer>
                :
                <B.MainContainer>
                  <button>{props.text}</button>
                  <div></div>
                </B.MainContainer>
              }
            </>
          }
        </>
      }
    </>
  )
}

export default ButtonGeneric