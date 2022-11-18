import * as B from '../styles/buttonGenericStyle'
import React from 'react'

interface Props {
    text:string
}

const ButtonGeneric = (props: Props) => {
  return (
    <B.MainContainer>
        <button>{props.text}</button>
        <div></div>
    </B.MainContainer>
  )
}

export default ButtonGeneric