import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import styled from 'styled-components';
import GoToIcon from '../../svg/goToIcon';

const Section10 = () => {

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
    <CardContainer10>
            { !information ? '':
                <Title className='section__header'>
                    <h3>{information.titleSection10}</h3>
                <div>
                    {(() => {
                        
                            return(
                                <Link to ={information.URLSection10}> 
                                    <GoToIcon></GoToIcon>
                                    <span>Ver todas</span>
                                </Link>
                            )
                        
                    })()}
                </div>
            </Title>
            }
            <CardContainerWrap10>
                <Items>
                { !information ? '':
                    information.info10.map((element,index) => {
                        
                        return (
                            
                            <CardContent key = {element.id}>
                                <Link to = {element.url} className='card__background--wrap'>
                                    <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                                </Link>
                                <div className='card__description'>
                                    <Link to={element.url} className='title-link'>
                                        <h2>{(element.title)}</h2>
                                    </Link>
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
            </CardContainerWrap10>
        </CardContainer10>
  )
}

export default Section10

const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`

const CardContainer10 = styled.div`
    max-width: 870px;
    margin: 0 auto 58px;
    position: relative;
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
const CardContainerWrap10 = styled.div`
    display: grid;
    grid-template-columns: 530px calc( 100% - 546px);
    grid-gap: 16px;
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`


const CardContent = styled.div`
    display: grid;
    grid-template-columns: 155px calc( 100% - 175px );
    grid-gap: 20px;
    margin-bottom: 20px;
    .card__background--wrap{
        position: relative;
        width: 100%;
        height: 104px;
        overflow: hidden;
        border-radius: 10px;
    }
    .card__background{
        position: relative;
        width: 100%;
        height: 104px;
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
        padding: 0px;
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
            margin:0 0 19px;
        }
        p{
            font-size: 13px;
            color: #868495;
            margin:8px 0 0;
            padding:0;
            &.card__description{
                margin: 40px 0;
                font-size: 15px;
                color: #4C4A58;
            }
            &:first-of-type{
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