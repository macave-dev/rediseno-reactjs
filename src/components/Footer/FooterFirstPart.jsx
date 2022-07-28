import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FbIcon from '../../svg/fbIcon';
import Logo from '../Header/Logo';
import YtIcon from '../../svg/ytIcon';
import InstagramIcon from '../../svg/instagramIcon';
import TwitterIcon from '../../svg/twitterIcon';

const FooterFirstPart = ({props}) => {

  return (
    <FooterFirst>
            <div>
                <Logo/>
            </div>

            {!props ? null : (
                <ul>
                    <li>
                        <Link target="_blank" to={props.Facebook}>
                            <FbIcon />
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={props.Instagram}>
                            <InstagramIcon></InstagramIcon>
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={props.Twitter}>
                            <TwitterIcon></TwitterIcon>
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={props.YouTube}>
                            <YtIcon></YtIcon>
                        </Link>
                    </li>
                </ul>
            )
            }
            
        </FooterFirst>
  )
}

export default FooterFirstPart


const FooterFirst = styled.div`
    display: grid;
    max-width: 870px;
    margin: 0 auto 20px;
    grid-template-columns: 50% 50%;
    ul{
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 45px);
        align-items: center;
        justify-content: end;
        li{
            text-align: center;
            a{
                display: inline-block;
                height: fit-content;
                line-height: 1;
                svg{
                    display: block
                }
            }
        }
    }
`
