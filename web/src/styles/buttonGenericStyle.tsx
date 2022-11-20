import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    z-index: 2;
    position: relative;
    button{
        cursor: pointer;
        width: 100%;
        min-height: 65px;
        padding: 10px 20px;
        margin: 8px 0px;
        border: 2px solid white;
        border-radius: 25px;
        background-color: white;
        color: black;
        font-size: 28px;
        font-weight: bolder;
    }
    div{
        width: 100%;
        height: 90%;
        border: 2px solid white;
        border-radius: 30px;
        background-color: black;
        position: absolute;
        top: 10%;
        left: 2%;
        z-index: -1;
    }
`

export const WhiteBG = styled.div`
    width: 80%;
    z-index: 2;
    position: relative;
    margin-top: 16px;
    button{
        cursor: pointer;
        width: 100%;
        min-height: 65px;
        padding: 10px 20px;
        margin: 8px 0px;
        border: 2px solid black;
        border-radius: 25px;
        background-color: black;
        color: white;
        font-size: 28px;
        font-weight: bolder;
        }
        div{
        width: 100%;
        height: 85%;
        border: 2px solid black;
        border-radius: 30px;
        background-color: white;
        position: absolute;
        top: 11%;
        left: 1.5%;
        z-index: -1;
    } 
`