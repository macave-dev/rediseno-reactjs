import React from 'react';
import {Link } from 'react-router-dom'
import styled from "styled-components"

const SubMenu = ({props}) => {

    return(
        <Sub>
            <ul>
                {props.map((item,id) => {
                  return(
                    <li key = {id}>
                        <Link to = {item.url} target = "_blank">{item.title}</Link>
                    </li>
                )})} 
            </ul>
        </Sub>
    )
}

export default SubMenu;

const Sub = styled.div`
    max-width: 870px;
    margin: 0 auto;
    position: relative;
    z-index: 6;
    & > div{
        overflow: hidden;
        overflow-x: scroll;
        height: 40px;
    }
    @media (max-width: 900px) {
        width: 95%;
    }
    ul{
        height: 32px;
        display: flex;
        flex-direction: row;
        gap: 22px;
        list-style: none;
        padding: 9px 0 0;
        box-sizing: border-box;
        margin: 0;
        a {
            color: #e0e0e;
            text-decoration: none;
            color: #ADADAD;
        }
        li{
            white-space: nowrap;
            &.active{
                a{
                    color:#000000;
                }
                border-bottom: 1px solid #000000;
            }
        }
    }
    &::after{
        content: ' ';
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        left: 0;
        background: #EDEDED;
    }
`