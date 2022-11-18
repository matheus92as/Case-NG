import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
`

export const FirstSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: black;
    color: white;
    position: static;
`

export const BgLimit = styled.div`
    width: 65%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    min-height: 100px;
    margin-top: 32px;    
`

export const Content = styled.div`
    display: flex;
    width: 90%;
    min-height: 500px;
    margin-top: 48px;
`

export const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    h1{
        font-size: 48px;
        margin-bottom: 0px;
    }
    h2{
        font-size: 42px;
        font-weight: lighter;
        margin-top: 0px;
    }
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 60%;
        img{
            width: 150px;
            height: auto;
        }
    }
`
export const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 50%;
    position: relative;
    img{
        width: 550px;
        height: auto;
    }
`