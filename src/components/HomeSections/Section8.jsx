import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import GoToIcon from '../../svg/goToIcon'
import styled from 'styled-components';

const Section8 = () => {

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
    <CardContainer8>
            { !information ? '':
                <Title className='section__header'>
                    <h3>{information.titleSection8}</h3>
                <div>
                    {(() => {
                        
                            return(
                                <Link to ={information.URLSection8}> 
                                    <GoToIcon></GoToIcon>
                                    <span>Ver todas</span>
                                </Link>
                            )
                        
                    })()}
                </div>
            </Title>
            }
            <CardContainerWrap8>
                <Items>
                { !information ? null:
                    information.info8.map((element,index) => {
                        
                        return (
                            
                            <CardContent key = {element.id}>
                                <Link to = {element.url} className='card__background--wrap'>
                                    <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                                </Link>
                                <div className='card__description'>
                                    <Link to={element.url} className='title-link'>
                                        <h2>{(element.title)}</h2>
                                    </Link>
                                    <p className='card__description'>{element.metadescription[0]}</p>
                                    <p>
                                        {dayjs(element.date).format("DD MMMM YYYY")} - {information.titleSection10}
                                    </p>
                                    <p>
                                        {element.author}
                                    </p>
                                </div>
                            </CardContent>
                        )
                    })
                }
                </Items>
                <Advertisement>
                
                </Advertisement>
            </CardContainerWrap8>
        </CardContainer8>
  )
}

export default Section8


const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`

const CardContainer8 = styled.div`
    max-width: 870px;
    margin: 0 auto 58px;
    position: relative;
`

const Article = styled.article`
    & > a {
        display: block;
        margin: 6px 0
        font-size: 1.2em;
        color: black;
        text-decoration: none;
        
    }
`
const Items = styled.div``
const Advertisement = styled.div`
    img{
        margin-bottom: 16px;
        width: 100%;
        height: auto;
        &:last-of-type{
            margin: 0;
        }
    }
`
const CardContainerWrap8 = styled.div`
    display: grid;
    grid-template-columns: 530px calc( 100% - 546px);
    grid-gap: 16px;
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`


const CardContent = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: grid;
    margin-bottom: 20px;
    .card__background--wrap{
        position: relative;
        width: 100%;
        height: 298px;
        overflow: hidden;
        border-radius: 10px;
    }
    .card__background{
        position: relative;
        width: 100%;
        height: 298px;
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
            font-size: 24px;
            color: #4C4A58;
            font-weight: 600;
            padding: 0;
            margin:0;
        }
        p{
            font-size: 13px;
            color: #868495;
            margin:8px 0 0;
            padding:0;
            &.card__description{
                font-size: 15px;
                color: #4C4A58;
            }
            &:last-of-type{
                margin: 0;
            }
        }
    }
    &:hover{
        .card__background{
            transform: scale(1.2);
        }
    }
`