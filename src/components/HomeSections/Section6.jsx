import React, {useEffect,useState} from 'react';
import styled from 'styled-components'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'
import GoToIcon from '../../svg/goToIcon';


const Section6 = () => {

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
    <>
       { !information ? '':
                <Title className='section__header'>
                    <h3>{information.titleSection6}</h3>
                <div>
                    {(() => {
                        if ( information.URLSection6 ) {
                            return(
                                <Link to ={information.URLSection6}> 
                                    <GoToIcon></GoToIcon>
                                    <span>Ver todas</span>
                                </Link>
                            )
                        }
                    })()}
                </div>
            </Title>
            }


<Section6_content>
            
            {!information ? '':
                <div className='section-bg' style={{backgroundImage: `url("${information.IMGSection6}")`}}></div>
            }
                
                <div className='section-five__container'>
                    <Items>
                        { !information ? '':
                    information.info6.map((element,index) => {
                        
                        return (
                            <Link className = 'CardContent' key={element.id} to = {element.url} >
                                <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                                <div className='card__description'>
                                        <h2>
                                            {(element.title)}
                                        </h2>
                                    <p>
                                        {dayjs(element.date).format("DD MMMM YYYY")}
                                    </p>
                                </div>
                            </Link>
                        )
                    })
                }
                    </Items>
                </div>
            </Section6_content>
    </>
  )
}

export default Section6

const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`

const CardContent = styled.div`
    
`

const Section6_content = styled.div`
    max-width: 870px;
    margin: 0 auto 59px;
    padding: 36px 0;
    position: relative;
    .section-bg{
        position: absolute;
        height: 100%;
        width: 400%;
        left: 50%;
        background-size: contain;
        z-index: 1;
        top: 0;
        transform: translateX(-50%);
    }
    .section-five__container{
        position: relative;
        z-index:2;
    }
    & + .section__header{
        margin-top: 55px;
    }
`
const Items = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 8px));
    grid-gap: 16px;
    @media (max-width: 767px) {
        display: block;
    }
    .CardContent{
        position: relative;
    height: 155px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    .card__background{
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
    }
    .card__description{
        position: absolute;
        display: block;
        bottom: 0;
        box-sizing: border-box;
        padding: 19px 14px;
        color: white;
        z-index: 3;
        a{
            text-decoration: none;
            cursor:pointer;
        }
        h2{
            font-size: 15px;
            color: white;
            font-weight: 600;
            padding: 0;
            margin:0;
        }
        p{
            display: none;
        }
    }
    &:first-of-type{
        grid-area: 1 / 1 / 3 / 1;
        height: 100%;
        width: 100%;
        .card__description{
            p{
                display: block;
                margin: 12px 0 0;
                padding: 0;
                font-weight: 300;
                font-size: 13px;
            }
        }
    }
    &::after{
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        background-image: linear-gradient(to top,rgba(0,0,0,.6) 0,transparent 70%);
        content: "";
        display: block;
        z-index: 2;
    }
    &:hover{
        .card__background{
            transform: scale(1.2);
        }
    }
    @media (max-width: 767px) {
        margin-bottom: 16px;
        &:first-of-type{
            height: 326px;
        }
        &:last-of-type{
            margin-bottom: 0;
        }
    }
    }
`