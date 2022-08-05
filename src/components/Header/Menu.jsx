import React, { useState, useRef,useEffect } from 'react';
import {Link } from 'react-router-dom'
import styled from 'styled-components';


const Menu = ({props}) => {


    const [navbarOpen, setNavbarOpen] = useState(false)
    const ref = useRef(null);
    const changeStatus = (e) => {
        let bodyElement = document.getElementsByTagName('body'),
            listMenuElement = document.getElementById('hamburguer-menu-list');
        if ( !navbarOpen ) {
            bodyElement[0].classList.add('active-menu');
            if ( ref.current ) {
                listMenuElement.style.width = `${window.innerWidth}px`;
                listMenuElement.style.height = `${window.innerHeight}px`;
                listMenuElement.style.maxHeight = `${window.innerHeight}px`;
            }
        } else {
            bodyElement[0].classList.remove('active-menu');
        }
        setNavbarOpen(prev => !prev)
    };


    const closeNavBar = e => {
        setNavbarOpen(false)
    }

    
    const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/secondary';
    const [information,setInformation] = useState()
    const fetchApi = async() => {
        const response = await fetch(url);
        const responseJSON = await response.json();
        setInformation(responseJSON);
        
    }

    useEffect(() => {
        fetchApi();
    },[]);


    return (
        <>
            <MainMenu>
                <div id="nav-icon" className={navbarOpen ? "open" : "close"} onClick={changeStatus} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <HamburguerMenuContainer className={navbarOpen ? "open-menu" : "close-menu"} ref={ref} id="hamburguer-menu-list">
                    <ul>
                    {!information ? '':
                        information.map((item,id) => {
                            return(
                                <li onClick={closeNavBar} className = '' key = {id}>
                                    <a href={item.url}>{item.title}</a>
                                </li>
                            )})}
                    </ul>
                </HamburguerMenuContainer>
            </MainMenu>
        </>
    )
}

export default Menu


const MainMenu = styled.div`
    #nav-icon {
        width: 60px;
        height: 45px;
        position: relative;
        margin: 0px 0 0 -15px;
        transform: rotate(0deg) scale(0.5);
        transition: 0.5s ease-in-out;
        cursor: pointer;
        span {
            display: block;
            position: absolute;
            height: 7px;
            width: 50%;
            background: #000;
            opacity: 1;
            transform: rotate(0deg);
            transition: 0.25s ease-in-out;
            &:nth-of-type(even) {
                left: 50%;
                border-radius: 0 9px 9px 0;
            }
            &:nth-of-type(odd) {
                left: 0px;
                border-radius: 9px 0 0 9px;
            }
            &:nth-of-type(1),
            &span:nth-of-type(2) {
              top: 0;
            }
            &:nth-of-type(3),
            &:nth-of-type(4) {
              top: 18px;
            }
            &:nth-of-type(5),
            &:nth-of-type(6) {
                top: 36px;
            }
        }
        &.open{
            span{
                &:nth-of-type(1),
                &:nth-of-type(6) {
                    transform: rotate(45deg);
                }
                &:nth-of-type(2),
                &:nth-of-type(5) {
                    transform: rotate(-45deg);
                }
                &:nth-of-type(1) {
                    left: 5px;
                    top: 7px;
                }
                &:nth-of-type(2) {
                    left: calc(50% - 5px);
                    top: 7px;
                }
                &:nth-of-type(3) {
                    left: -50%;
                    opacity: 0;
                }
                &:nth-of-type(4) {
                    left: 100%;
                    opacity: 0;
                }
                &:nth-of-type(5) {
                    left: 5px;
                    top: 29px;
                }
                &:nth-of-type(6) {
                    left: calc(50% - 5px);
                    top: 29px;
                }
            }
        }
    }
    & > a {
        color: #e0e0e;
        text-decoration: none;
    }
`

const HamburguerMenuContainer = styled.div`
    overflow: hidden;
    height:0;
    background: white;
    transition: 0.25s ease-in-out;
    max-height: 0;
    z-index: 9999;
    display: none;
    padding: 50px 0;
    &.open-menu{
        height: 100%;
        width: 100%;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        max-height: 100%;
        transition: 0.25s ease-in-out;
        display: block;
    }
    ul{
        display: block;
        max-width: 870px;
        margin: 0 auto 20px;
        padding: 0;
        list-style: none;
        li{
            padding: 15px 0px;
            a{
                text-decoration: none;
                font-weight: 500;
                color: #000;
                font-size: 30px;
                &:hover{
                    color: #ADADAD;
                }
            }
        }
    }
    @media (max-width: 769px) {
        ul{
            li{
                padding: 22px 0 22px 35px;
                border-bottom: 1px solid #EFEFEF;
                &:last-of-type{
                    border: none;
                }
                a{
                    font-size: 17px;
                    font-weight: 400;
                }
            }
        }
    }
`