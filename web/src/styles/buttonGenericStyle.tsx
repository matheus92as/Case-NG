import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    min-height: 60px;
    z-index: 2;
    position: relative;
    button{
        cursor: pointer;
        width: 100%;
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
        height: 85%;
        border: 2px solid white;
        border-radius: 35px;
        background-color: black;
        position: absolute;
        top: 15%;
        left: 2%;
        z-index: -1;
    }
`