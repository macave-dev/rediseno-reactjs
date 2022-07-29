import React, {useEffect,useState} from 'react';
import styled from 'styled-components'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'
import GoToIcon from '../../svg/goToIcon';
import Go_to_icon from '../../assets/Go_to_icon.svg';

const Section7 = () => {

  const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/home'
    const [information,setInformation] = useState()
    const fetchApi = async() => {
        const response = await fetch(url)
        const responseJSON = await response.json()
        setInformation(responseJSON)
    }

    useEffect(() => {
        fetchApi()
    },[])


  return (
    <CardContainer7>
      { !information ? '':
                
                <Title className='section__header'>
                    <h3>{information.titleSection7}</h3>
                <div>
                    {(() => {
                        if ( information.URLSection7 ) {
                            return(
                                <Link to ={information.URLSection7}> 
                                    <GoToIcon></GoToIcon>
                                    <span>Ver todas</span>
                                </Link>
                            )
                        }
                    })()}
                </div>
            </Title>
            }
            <Items>

<CardContentText>
{!information ? "":
<>  
    <h2>{(information.info7[0].title)}</h2>
    <p>{information.info7[0].metadescription}</p>
   
    <Link to={information.info7[0].url } className="button__general--go-to" >
        <i><img src = {Go_to_icon} /></i>
        <span>Ver más</span>
    </Link>

</>
    
    }
    
    
</CardContentText>

<CardContentVideo>
    { !information ? '': 
        <Link to = {information.info7[0].url}>
             <img src = {information.info7[0].image} /> 
        </Link>
    }
</CardContentVideo>



{!information ? ".." :
    information.info7.slice(1,3).map(element => {
        return(
            <CardContentImage className='CardContentImage' key = {element.id}>
                {!information ? "":
                    <>
                        <Link to = {element.url} className='card__background--wrap'>
                            <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                        </Link>
                        <div className='card__description'>
                            <Link to={element.url} className='title-link'>
                                <h2>{(element.title)}</h2>
                            </Link>
                            <p>
                                {dayjs(element.date).format("DD MMMM YYYY")} - {information.titleSection5}
                            </p>
                            <p>
                                {element.author}
                            </p>
                        </div>
                    </>
                }
    
            </CardContentImage>
        )
    })
}

</Items>
    </CardContainer7>
  )
}

export default Section7


const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`

const CardContainer7 = styled.div`
    max-width: 870px;
    margin: 0 auto 58px;
    position: relative;
`

const CardContentImage = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: grid;
    .card__background--wrap{
        position: relative;
        width: 100%;
        height: 220px;
        overflow: hidden;
        border-radius: 10px;
    }
    .card__background{
        position: relative;
        width: 100%;
        height: 220px;
        transform: scale(1);
        transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        background-position: center;
        background-size: cover;
    }
    .card__description{
        position: relative;
        display: block;
        bottom: 0;
        box-sizing: border-box;
        padding: 19px 0px;
        color: white;
        z-index: 3;
        a{
            text-decoration: none;
            cursor:pointer;
        }
        h2{
            font-size: 15px;
            color: #4C4A58;
            font-weight: 600;
            padding: 0;
            margin:0;
        }
        p{
            font-size: 13px;
            color: #868495;
            margin:0;
            &:first-of-type{
                margin: 14px 0 8px;
            }
        }
    }
    &:hover{
        .card__background{
            transform: scale(1.2);
        }
    }
    @media (max-width: 767px) {
        order: 2;
    }
`
const CardContentText = styled.div`
    display: grid;
    align-self: center;
    justify-self: center;
    height: fit-content;
    text-align: center;
    h3{
        font-size: 24px;
        color: #4C4A58;
        margin: 0 auto 10px;
    }
    p{
        color: #4C4A58;
        font-size: 15px;
        margin: 0 auto 47px;
    }
    a{
        width: fit-content;
        justify-self: center;
    }
    @media (max-width: 767px) {
        order: 1;
        margin-bottom: 20px;
        margin-top: -21px;
        padding: 10px 15px 20px;
        border-right: 1px solid #D6D6D6;
        border-left: 1px solid #D6D6D6;
        border-bottom: 1px solid #D6D6D6;
        border-radius:  0 0 10px 10px;
        h3{
            font-size: 22px;
            margin-top: 10px;
        }
    }
`
const CardContentVideo = styled.div`
    border-radius: 10px;
    overflow: hidden;
    height: 275px;
    iframe{
        width: 100%;
        height: 280px;
    }
    @media (max-width: 767px) {
        order: 0;
        height: auto;
        border-right: 1px solid #D6D6D6;
        border-left: 1px solid #D6D6D6;
        border-top: 1px solid #D6D6D6;
        border-radius:  10px 10px 0 0;
    }
`

const Article = styled.article`
    
    padding: 10px;
    & > a {
        display: block;
        margin: 6px 0
        font-size: 1.2em;
        color: black;
        text-decoration: none;
        
    }
`

const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 8px));
    grid-gap: 16px;
    @media (max-width: 767px) {
        grid-template-columns: 1fr ;
    }
`