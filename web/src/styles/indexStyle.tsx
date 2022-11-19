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
    position: relative;
    
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

export const SecondSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: white;
    color: black;
    position: relative;
    overflow-x: hidden;
`

export const BgLimit2 = styled.div`
    width: 65%;
    height: 100%;
    position: absolute;
    right: -0.65%;
    top: 0;
`

export const UserInfos = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    min-height: 500px;
    margin-top: 48px;
    .greetings{
        font-size: 64px;
        margin-left: 64px;
    }
    .status{
        align-self: center;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export const YeyButton = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 90px;
    min-height: 45px;
    border-radius: 20px;
    background-color: white;
    align-self: flex-end;
    margin-bottom: 24px;
    z-index: 2;
    img{
        width: 60px;
        height: auto;
    }
`

export const Balance = styled.div`
    width: 100%;
    text-align: center;
    border-radius: 35px;
    background-color: white;
    color: black;
    h1{
        font-size: 96px;
        font-weight: lighter;
        margin: 25px 0;
    }
`

export const StatusBottons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    gap: 16px;
`

export const TransferCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 600px;
    min-height: 510px;
    border: 2px solid black;
    border-radius: 40px;
    box-shadow: 10px 10px 1px black;
    background-color: white;
    color: black;
    margin-top: 32px;
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
    h2{
        font-size: 32px;
        margin-top: 32px;
        margin-bottom: 16px;
        margin-left: 38px;
        align-self: flex-start;
    }
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 85%;
        label{
            font-size: 28px;
            align-self: flex-start;
        }
        input{
            width: 100%;
            padding: 10px 20px;
            margin: 8px;
            border: 2px solid black;
            border-radius: 25px;
            background-color: white;
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
        border: none;
        border-radius: 15px;
        font-size: 32px;
        background-color: inherit;
        color: black;
    }
`

export const CardTranfs  = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 80%;
    min-height: 100px;
    margin-top: 64px;
    background-color: white;
    border: 2px solid black;
    border-radius: 35px;
    box-shadow: 10px 10px 1px black;
    position: relative;
    .viewTranfs{
        display: flex;
        justify-content: center;
        cursor: pointer;
        min-height: 30px;
        border-radius: 20px;
        background-color: white;
        position: absolute;
        top: 2%;
        right: 1%;
        margin-bottom: 24px;
        z-index: 2;
        img{
            width: 60px;
            height: auto;
        }
    }
    .cardHead{
        width: 85%;
        align-self: flex-start;
        margin-left: 42px;
        position: relative;
        h2{
            font-size: 32px;
            text-align: start;
            padding-bottom: 5px;
            border-bottom: 2px solid black;
        }
        .inOut{
            min-width: 100px;
            min-height: 50px;
            /* border: 2px solid black; */
            font-size: 32px;
            font-weight: bold;
            position: absolute;
            top: 25%;
            right: 5%;
            button{
                font-size: 32px;
                font-weight: bold; 
                border: none;
            }           
        }
    }
    .list{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 48px;
        border: 2px solid black;
        .listItem{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            border: 2px solid black;
            position: relative;
            p{
                font-size: 28px;
                margin: 16px 16px;
            }
            img {
                width: 50px;
                height: 50px;
            }
            .transfSymbol{
                display: flex;
                width: 60px;
                height: 60px;
                background-color: black;
                border-radius: 50%;
                color: white;
                text-align: center;
                justify-content: center;
                align-items: center;
                font-size: 18px;
            }
            .nameStatus{
                display: flex;
                flex-direction: column;
                min-width: 100px;
                margin-left: 12px;
                /* border: 2px solid black; */
                h2{
                    font-size: 32px;
                    margin-bottom: 16px;
                }
                span{
                    font-size: 24px;
                }
            }
            .dateValue{
                display: flex;
                flex-direction: column;
                text-align: end;
                min-width: 100px;
                margin-left: 12px;
                position: absolute;
                right: 0;
                /* border: 2px solid black; */
                h2{
                    font-size: 32px;
                    margin-bottom: 16px;
                }
                span{
                    font-size: 24px;
                }
            }
        }
    }
`