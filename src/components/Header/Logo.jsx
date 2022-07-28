import React, {useState,useEffect} from 'react';
import {Link } from 'react-router-dom'
import styled from 'styled-components';
 
const Logo = () => {

    const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/schema';
    const [information,setInformation] = useState([])
    const fetchApi = async() => {
        const response = await fetch(url);
        const responseJSON = await response.json();
        setInformation(responseJSON);
        
    }

    useEffect(() => {
        fetchApi();
    },[])
    
    return(
        <LogoContent>
            {!information ? null :
            <Link to = '/'>
                <img src={information.Logo} alt = '' />
            </Link>}
        </LogoContent>
    )
}

export default Logo;



const LogoContent = styled.div`
    .hide-title{
        display: none;
    }
    justify-self: center;
    a{
        display: block;
        margin: 10px auto;
        img{
            width: auto;
            height: 50px;
        }
    }
`