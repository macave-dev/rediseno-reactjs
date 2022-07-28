import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs';
import Slider from 'react-slick';
import LeftArrowIcon from "../svg/leftArrowIcon"
import RightArrowIcon from "../svg/rightArrowIcon"
import uniqueId from 'lodash/uniqueId';
import { Link } from 'react-router-dom'



function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <LeftArrowIcon></LeftArrowIcon>
        </div>
    );
  }
  
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <RightArrowIcon></RightArrowIcon>
        </div>
    );
  }

const InterestedPosts = () => {

    const slug = window.location.pathname
    const slug_f = slug.slice(1)
    const urlPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${slug_f}`
    const [dataPost, setDataPost] = useState(null)

    const fetchAPI = async() => {
        const responsePost = await fetch(urlPost)
        const responsePostJSON = await responsePost.json()    
        setDataPost(responsePostJSON[0]['jetpack-related-posts'])
    }
    
    
    useEffect(() => {
        fetchAPI()
    },[])

    console.log('hello')
    console.log(dataPost)

    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        slidesToShow: 2,
        speed: 500,
        variableWidth: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        dots: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
        };
    


  return (
    <InterestedSlider>
        <h3>Te puede interesar</h3>
        <InterestedSliderContent>
            {!dataPost ? null : (
                dataPost.map(element => {
                    return (
                        <div key = {element.id} >
                            <CardContent>
                                <div className='card__background--wrap'>
                                    <div className='card__background' style={{backgroundImage: `url(${element.img.src})`}}></div>
                                </div>
                                <p>{(element.title)}</p> 
                            </CardContent>
                        </div>
                    )
                })
            )}
        </InterestedSliderContent>
    </InterestedSlider>
  )
}

export default InterestedPosts

const InterestedSlider = styled.div`
    margin: 60px 0 80px;
    h3{
        margin-top: 0;
        font-size: 17px;
        color: #000000;
        font-weight: 500;
        text-transform: uppercase;
    }
    @media (min-width: 768px) and (max-width: 900px) {
        width: 90%;
        margin: 60px auto 80px;
    }
    a{
        text-decoration: none;
    }
`
const InterestedSliderContent = styled.div`
    padding: 0 15px 0 0;
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
        color: #4C4A58;
        position: absolute;
        z-index: 9;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        .slick-hidden {
            display: none;
        }
        &.slick-prev{
            left: -25px;
        }
        &.slick-next{
            right: -10px;
        }
    }
    @media (min-width: 768px) and (max-width: 900px){
        .slick-slider{
            width: 96%;
        }
        .slick-arrow{
            &.slick-next{
                right: -35px;
            }
        }
    }
`

const CardContent = styled.div`
    position: relative;
    height: 68px;
    width: 220px;
    padding: 0 10px;
    display: grid;
    grid-template-columns: 72px auto;
    grid-gap: 16px ;
    align-items: center;
    .card__background--wrap{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
    .card__background{
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        background-position: center;
        background-size: cover;
    }
    p{
        font-size: 13px;
        font-weight: 400;
        line-height: 15px;
        max-height: 60px;
        margin: 0;
        color: #4C4A58;
    }
    &:hover{
        .card__background{
            transform: scale(1.2);
        }
    }
    @media (min-width: 768px) and (max-width: 900px) {
        width: 220px;
    }
    @media (max-width: 767px) {
        width: 250px;
    }
`