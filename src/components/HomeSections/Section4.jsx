import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import RightArrowIcon from '../../svg/rightArrowIcon';
import LeftArrowIcon from '../../svg/leftArrowIcon';
import GoToIcon from '../../svg/goToIcon';
import styled from 'styled-components';
import dayjs from 'dayjs';



function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div className={className} onClick={onClick}>
          <LeftArrowIcon props={props.id}></LeftArrowIcon>
      </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div className={className} onClick={onClick}>
          <RightArrowIcon props={props.id}></RightArrowIcon>
      </div>
  );
}



const Section4 = () => {

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


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    variableWidth: true,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    dots: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            arrows: false,
            centerMode: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false
          }
        }
      ]
};


  return (
    <>
      <SliderContent>
      { !information ? null:
                    <Title className='section__header'>
                        <h3>{information.titleSection4}</h3>
                    <div>
                        {(() => {
                            if ( information.URLSection4 ) {
                                return(
                                    <a href ={information.URLSection4}> 
                                        <GoToIcon></GoToIcon>
                                        <span>Ver todas</span>
                                    </a>
                                )
                            }
                        })()}
                    </div>
                </Title>
                }
                <Slider {...settings}>
                    { !information ? null:
                        
                        information.info4.map((element,index) => {
                            return (
                                <div key = {'item'+element.id}>
                                    <CardContent>
                                    
                                        <div className="slide-item">            
                                            <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                                            <div className='card__opacity'></div>
                                            <div className='card__description'>
                                                <a href={element.url} key = {'title-'+element.id}>
                                                    <h2>
                                                        {(element.title)}
                                                    </h2>
                                                </a>
                                                <ul>
                                                    <li>
                                                        <span>{dayjs(element.date).format("DD MMMM YYYY")}</span>
                                                    </li>
                                                    <li>
                                                        <a href={element.url} className="button__general--go-to" key = {element.id}>
                                                            <i className='icon-go-to'><GoToIcon></GoToIcon></i>
                                                            <span>Ver más</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                                
                            )
                        })
                    }
                </Slider>
      </SliderContent>
    </>
  )
}

export default Section4


const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`

const SliderContent = styled.div`
    margin-bottom: 50px;
    /* Slider */
    .slick-slider {
        position: relative;
        display: block;
        box-sizing: border-box;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
    }
    .slick-list {
        position: relative;
        overflow: hidden;
        display: block;
        margin: 0;
        padding: 0;
        height: 380px;
        &:focus {
            outline: none;
        }
        &.dragging {
            cursor: pointer;
            cursor: hand;
        }
    }
    .slick-slider .slick-track,
    .slick-slider .slick-list {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    .slick-track {
        position: relative;
        left: 0;
        top: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
        &:before,
        &:after {
            content: "";
            display: table;
        }
        &:after {
            clear: both;
        }
        .slick-loading & {
            visibility: hidden;
        }
    }
    .slick-slide {
        float: left;
        height: 100%;
        min-height: 1px;
        [dir="rtl"] & {
            float: right;
        }
        img {
            display: block;
        }
        &.slick-loading img {
            display: none;
        }
        display: block;
        &.dragging img {
            pointer-events: none;
        }
        .slick-initialized & {
            display: block;
        }
        .slick-loading & {
            visibility: hidden;
        }
        .slick-vertical & {
            display: block;
            height: auto;
            border: 1px solid transparent;
        }
        &.slick-active{
            opacity: 1;
        }
    }
    .slick-arrow{
        display: block;
        width: 15px;
        height: 28px;
        color: white;
        position: absolute;
        z-index: 9;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        .slick-hidden {
            display: none;
        }
        &.slick-prev{
            left: 110px;
        }
        &.slick-next{
            right: 110px;
        }
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
    border: 3px solid #FF00F7;
    padding: 10px;
    margin: 10px;
    
    & > a {
        display: block;
        margin: 6px 0
        font-size: 1.2em;
        color: black;
        text-decoration: none;
        
    }
`


const CardContent = styled.div`
    position: relative;
    height: 380px;
    width: 239px;
    .slide-item{
        width: calc( 100% - 8px);
        transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        border-radius: 8px;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .card__background{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-position: 50% 50%;
            -webkit-background-size: cover;
            background-size: cover;
            transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
            transform: scale(1);
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
                height: 70px;
                margin-bottom: 15px;
            }
            ul{
                padding: 0;
                list-style: none;
                display: grid;
                grid-template-columns: 1fr 1fr;
                margin: 0;
                li{
                    display: flex;
                    & > span{
                        font-size: 13px;
                        font-weight: 300;
                    }
                    &:last-child{
                        justify-content: end;
                    }
                }
            }
            .button__general--go-to{
                color: white;
                width: fit-content;
                grid-template-columns: 12px auto;
                i{
                    width: 12px;
                    height: 12px;
                }
                span{
                    color: white;
                    font-size: 13px;
                    font-weight: 300;
                    width: fit-content;
                    display: inline-block
                }
            }
        }
        &::after{
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            background-image: linear-gradient(to top,rgba(0,0,0,.6) 0,transparent 65%);
            content: "";
            display: block;
        }
        &:hover{
            .card__background{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-position: 50% 50%;
                -webkit-background-size: cover;
                background-size: cover;
                transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
                transform: scale(1.2);
            }
        }
    }
`