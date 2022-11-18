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
    align-items: center;
    width: 50%;
    h1{
        font-size: 42px;
        margin-bottom: 8px;
        text-align: center;
    }
    h2{
        width: 80%;
        font-size: 32px;
        font-weight: lighter;
        margin-top: 8px;
        text-align: center;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 75%;
        input{
            width: 100%;
            padding: 10px 20px;
            margin: 8px;
            border: 2px solid white;
            border-radius: 25px;
            background-color: black;
            color: white;
            font-size: 28px;
        }
    }
    .close{
        cursor: pointer;
        position: absolute;
        top: 1%;
        right: 1%;
        padding: 5px;
        margin: 5px;
        width: auto;
        border-radius: 15px;
        font-size: 32px;
        background-color: inherit;
        color: white;
    }
    span{
        width: 50%;
        text-align: center;
        font-size: 24px;
        margin-top: 18px;
        a{
            cursor: pointer;
            font-weight: bolder;
            text-decoration: underline;
        }
    }
`
export const CardDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 50%;
    position: relative;
    .list{
        width: 80%;
        min-height: 400px;
        background-color: black;
        border: 2px solid white;
        border-radius: 35px;
        box-shadow: 10px 10px 1px white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 48px;
        h1{
            width: 90%;
            font-size: 40px;
            text-align: center;
        }
        .listItens{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 80%;
            p{
                font-size: 28px;
                margin: 16px 16px;
            }
            img {
                width: 50px;
                height: 50px;
            }
        }
    }
`