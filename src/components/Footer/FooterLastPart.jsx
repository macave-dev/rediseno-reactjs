import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const FooterLastPart = ({props}) => {

    return(
        <FooterLast>
            {!props ? null : (
                <div>
                <ul>
                    <li>
                        <Link target="_blank" to='/politica-de-privacidad/'>Aviso de privacidad</Link>
                    </li>
                    <li>
                        <Link target="_blank" to = '/terminos-y-condiciones-de-uso-aviso-de-privacidad/'>Términos y condiciones </Link>
                    </li>
                </ul>
                <div>
                    <p> Desarrollado por <Link to = 'https://macave.mx/' target = 'blank'> Macave. </Link>Copyright C 2022 - 2023
                    </p>
                </div>
        </div>
            )
            }
            
        </FooterLast>
    )
}

export default FooterLastPart

const FooterLast = styled.div`
    a{
        text-decoration: none;
        color: #4C4A58;
    }
    & > div{
        display: grid;
        max-width: 870px;
        margin: 0 auto 20px;
        grid-template-columns: 35% 65%;
        align-items: center;
        padding-bottom: 28px;
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                display: inline-block;
                &:first-of-type{
                    padding-right: 8px;
                    margin-right: 7px;
                    position: relative;
                    &::after{
                        content: ' ';
                        display:block;
                        position: absolute;
                        width: 1px;
                        height: 12px;
                        border-right: 1px solid #4C4A58;
                        top: 50%;
                        margin-top: -5px;
                        right: 0px;
                    }
                }
                a{
                    text-decoration: none;
                    color: #4C4A58;
                    font-size: 12px;
                    font-weight: 300;
                }
            }
        }
        p{
            color: #4C4A58;
            font-size: 12px;
            margin: 0;
            font-weight: 300;
            padding-top: 3px;
        }
        @media (max-width: 769px) {
            display: block;
            text-align: center;
            margin-top: 30px;
            ul{
                margin-bottom: 10px;
            }
            p{
                line-height: 1.5;
            }
        }
    }
`