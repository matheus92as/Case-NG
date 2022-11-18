import styled from "styled-components";

export const Background = styled.div`
    display: flex;
    position: fixed;
    z-index: 2;
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.75);
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 510px;
    min-height: 510px;
    border: 2px solid white;
    border-radius: 40px;
    box-shadow: 10px 10px 1px white;
    background-color: black;
    color: white;
    margin: auto;
    position: relative;
    animation: scale-in 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940);
    @keyframes scale-in{
        0%{
            transform: scale(0);
        }
        100%{
            transform: scale(1);
        }
    }
    h1{
        font-size: 46px;
        margin-top: 68px;
        margin-bottom: 28px;
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