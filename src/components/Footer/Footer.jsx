import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import SubMenuFooter from './SubMenu';
import FooterFirstPart from './FooterFirstPart';
import FooterLastPart from './FooterLastPart';
import styled from 'styled-components'

const Footer = () => {

    const url_Schema = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/schema';
    const url_Footer = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/footer';


    const [infoSchema,setInfoSchema] = useState([]);
    const [infoFooter,setInfoFooter] = useState([]);


    const fetchApiSchema = async() => {
        const response = await fetch(url_Schema);
        const responseJSON = await response.json();
        setInfoSchema(responseJSON);
    }

    const fetchApiFooter = async() => {
        const response = await fetch(url_Footer);
        const responseJSON = await response.json();
        setInfoFooter(responseJSON);
    }

    useEffect(() => {
        fetchApiSchema();
        fetchApiFooter();
    },[])



    return (
        <FooterContainer>
            {!infoSchema || !infoFooter ? null : (

                <>
                    <FooterFirstPart props = {infoSchema} />
            <FooterContent>
                <SubMenuFooter props = {infoFooter} />
                {
                    <>
                        <DIRECCION className='direction-column'>
                            <h4>DIRECCIÓN</h4>
                            <p>{infoSchema.Direccion}</p>
                            
                        </DIRECCION>
                        <CONTACTO className='contact-column'>
                            <h4>CONTACTO</h4>
                            <Link to={`mailto:${infoSchema.Contacto}`} target="_blank">{infoSchema.Contacto}</Link>
                        </CONTACTO>
                    </>
                }
                
            </FooterContent>
            <FooterLastPart props={ infoSchema} />
                </>


            )}
            
        </FooterContainer>
        
    )
}

export default Footer;

const FooterContainer = styled.div`
    background: #EBEBEB;
    padding: 0 20px;
    @media (max-width: 769px) {
        padding: 10px 20px;
        box-sizing: border-box;
    }
`

const FooterContent = styled.div`
    display: grid;
    max-width: 870px;
    margin: 0 auto 20px;
    grid-template-columns: repeat(8, calc( calc(100% - 140px) / 8));
    grid-gap: 20px;
    width: 100%;
    ul{
        padding:0;
        margin: 0;
    }
    h4{
        color:#4C4A58;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 20px;
    }
    @media (max-width: 769px) {
        display: block;
        & > div{
            margin-bottom: 20px;
        }
    }
`
const DIRECCION = styled.div`
    p, a{
        color: #4C4A58;
        font-size: 14px;
        text-decoration: none;
    }
`
const CONTACTO = styled.div`
    a{
        color: #4C4A58;
        font-size: 14px;
        text-decoration: none;
    }
    @media (max-width: 769px) {
        padding-left: 0;
    }
`