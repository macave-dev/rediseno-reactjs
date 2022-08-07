import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LeftArrowIcon from '../svg/leftArrowIcon';
import RightArrowIcon from '../svg/rightArrowIcon';
import Slider from 'react-slick';
import uniqueId from 'lodash/uniqueId';
import GoToIcon from '../svg/goToIcon';
import axios from 'axios';
import he from 'he'
import styled from 'styled-components';

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
const RelatedPosts = (categoryID) => {


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
    

    const [posts,setPosts] = useState(null);
    const [categories,setCategories] = useState(null);

    useEffect(() => {
        axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/posts?categories=${categoryID.categoryID}`).then(
            res => {
                setPosts(res.data.slice(-5));
            }
        )
    })




    function SliderElement(props) {

        let data = [props.props[0]],
            localSettings = data.length > 2 ? settings : [{arrows:false}],
            localClass = data.length > 2 ? '' : 'no-slider';

        return(
            <Slider {...localSettings} className={localClass}>
                {data.map((post,id) => {
                    const formattedDate = dayjs(post.date).format("DD MMMM YYYY");
                    return(
                        <div key = {id}>
                            <CardContent className='card-content'>
                                <div className='card__background--wrap'>
                                    <div className='card__background' style={{backgroundImage: `url(${post.jetpack_featured_media_url})`}}></div>
                                </div>
                                <CardContentInfo>
                                    <a href = {post.link}>
                                        <h2>{he.decode(post.title.rendered)}</h2>
                                    </a>
                                    <ul>
                                        <li>{formattedDate}</li>
                                        <li>
                                            <a href = {post.link}>
                                                <i><GoToIcon></GoToIcon></i>
                                                <span>Ver más</span>
                                            </a>
                                        </li>
                                    </ul>
                                </CardContentInfo>
                            </CardContent>
                        </div>
                        
                    )
                })}
            </Slider>
        )
    }


  return (
    <RelatedNotesContainer>
            <h3>NOTAS RELACIONADAS</h3>
            <RelatedNotesSliderContent>
                {!posts ?  null :
                   <SliderElement props={posts} ></SliderElement> }
            </RelatedNotesSliderContent>
        </RelatedNotesContainer>
  )
}

export default RelatedPosts


const RelatedNotesContainer = styled.div`
    h3{
        margin-top: 0;
        font-size: 17px;
        color: #000000;
        font-weight: 500;
        text-transform: uppercase;
    }
    .slick-slider.no-slider{
        .card-content{
            padding: 0;
        }
    }
`
const RelatedNotesSliderContent = styled.div`
    margin: 36px 0 57px;
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
            width: 97%;
        }
        .slick-arrow{
            &.slick-next{
                right: -44px;
            }
        }
    }
`
const CardContent = styled.div`
    position: relative;
    width: 245px;
    padding: 0 20px;
    .card__background--wrap{
        position: relative;
        width: 100%;
        height: 167px;
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
`
const CardContentInfo = styled.div`
    margin: 14px auto;
    width: calc( 100% - 28px );
    a{
        text-decoration: none;
    }
    h2{
        font-size: 15px;
        color: #000000;
        font-weight: 500;
        margin-bottom: 15px;
        height: 54px;
    }
    ul{
        display: grid;
        grid-template-columns: 50% 50%;
        padding: 0;
        list-style: none;
        li{
            font-size: 13px;
            font-weight: 400;
            a{
                display: grid;
                grid-template-columns: 12px auto;
                grid-gap: 8px;
                align-items: center;
                color: #000000;
                i{
                    width: 12px;
                    height: 12px;
                    svg{
                        width: 100%;
                    }
                }
            }
            &:last-of-type{
                justify-self: end;
            }
        }
    }
`