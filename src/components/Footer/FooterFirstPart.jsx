import React, {useEffect,useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FbIcon from '../../svg/fbIcon';
import Logo from '../Header/Logo';
import YtIcon from '../../svg/ytIcon';
import InstagramIcon from '../../svg/instagramIcon';
import TwitterIcon from '../../svg/twitterIcon';

const FooterFirstPart = () => {


    const url_Schema = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/schema';
    const [infoSchema,setInfoSchema] = useState();
    const fetchApiSchema = async() => {
        const response = await fetch(url_Schema);
        const responseJSON = await response.json();
        setInfoSchema(responseJSON);
    }
    useEffect(() => {
        fetchApiSchema();
    },[])


  return (
    <FooterFirst>
            <div>
                <Logo/>
            </div>

            {!infoSchema ? null : (
                <ul>
                    <li>
                        <Link target="_blank" to={infoSchema.Facebook}>
                            <FbIcon />
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={infoSchema.Instagram}>
                            <InstagramIcon></InstagramIcon>
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={infoSchema.Twitter}>
                            <TwitterIcon></TwitterIcon>
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" to={infoSchema.YouTube}>
                            <YtIcon></YtIcon>
                        </Link>
                    </li>
                </ul>
            )}
            
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
