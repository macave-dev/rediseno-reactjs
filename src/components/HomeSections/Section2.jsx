import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import GoToIcon from '../../svg/goToIcon';
import styled from 'styled-components'
import Go_to_icon from '../../assets/Go_to_icon.svg'


const Section2 = () => {


  const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/home'
    
    const [information,setInformation] = useState()
    const fetchApi = async() => {
        const response = await fetch(url)
        const responseJSON = await response.json()
        setInformation(responseJSON)
    }
    useEffect(() => {
        fetchApi()
    },[]);



  return (
    <div>
        { !information ? null:
                <Title className='section__header'>
                    <h3>{information.titleSection2}</h3>
                    <div>
                        {(() => {
                            if ( information.URLSection2 ) {
                                return(
                                    <a href ={information.URLSection2}> 
                                        <GoToIcon></GoToIcon>
                                        <span>Ver todas</span>
                                    </a>
                                )
                            }
                        })()}
                    </div>
                </Title>
            }

          <Items className='cover__wrap-2'>
                { !information ? '':
                    
                    information.info2.map((element,index) => {
                        
                        return (
                            <Article key = {element.id}>
                                <a href={element.url}>
                                    <span className='card__background--wrap'>
                                        <span className='card__background' style={{backgroundImage: `url(${element.image})`}}></span>
                                    </span>
                                </a>
                                <CardContent>
                                    <a href={element.url} className='title-link'>
                                        <h2>
                                            {(element.title)}
                                        </h2>
                                    </a>
                                    <p>
                                        {dayjs(element.date).format("DD MMMM YYYY")} - {information.titleSection2}
                                    </p>
                                    <span>{element.author}</span>
                                    <a href={element.url} className="button__general--go-to" >
                                        <i><img src = {Go_to_icon} /></i>
                                        <span>Ver más</span>
                                    </a>
                                </CardContent>
                            </Article>
                        )
                    })
                }
                
            </Items>
    </div>
  )
}

export default Section2

const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`
const Article = styled.article`
    display: grid;
    grid-template-columns: calc( 50% + 70px) calc( 50% - 70px);
    align-items: center;
    margin-bottom: 50px;
    & > a {
        border-radius: 0 10px 10px 0;
        overflow: hidden;
        height: 275px;
        position: relative;
        z-index: 2;
        .card__background--wrap{
            position: relative;
            width: 100%;
            height: 298px;
            overflow: hidden;
            border-radius: 10px;
            display: block;
        }
        .card__background{
            position: absolute;
            width: 100%;
            height: 298px;
            transform: scale(1);
            transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
            background-position: center;
            background-size: cover;
            display: block;
        }
    }
    .card__background:hover{
        transform: scale(1.2);
    }
    @media (max-width: 767px){
        display: block;
        & > a{
            display: block;
            border-radius: 10px;
            height: auto;
            img{
                display: block;
            }
        }
    }
`

const Items = styled.div`
    & > a {
        display: block;
        margin: 6px 0
        font-size: 1.2em;
        color: black;
        text-decoration: none;
        
    }
`

const CardContent = styled.div`
    background: #fff;
    margin-left: -70px;
    width: calc( 100% + 70px);
    box-sizing: border-box;
    padding: 30px 36px;
    border-radius: 10px 0px 0px 10px;
    border: 0.5px solid #D6D6D6;
    height: 223px;
    position: relative;
    z-index: 5;
    a{
        text-decoration: none;
    }
    h2{
        margin: 0;
        font-size: 24px;
        color: #4C4A58;
        font-weight: 600;
        max-height: 48px;
        min-height: 35px;
    }
    p{
        margin: 22px 0 14px;
        font-size: 13px;
        font-weight: 400px;
        color: #868495;
    }
    span{
        display: block;
        margin: 0px 0 30px;
        font-size: 13px;
        font-weight: 400px;
        color: #868495;
    }
    @media (max-width: 767px){
        margin: -70px auto 0;
        width: 85%;
        padding: 20px 15px;
        position: relative;
        border-radius: 10px;
        h3{
            font-size: 20px;
            font-weight: 500;
            max-height: 80px;
        }
    }
`