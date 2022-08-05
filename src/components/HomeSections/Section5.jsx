import React, {useEffect,useState} from 'react';

import dayjs from 'dayjs';
import GoToIcon from '../../svg/goToIcon';
import uniqueId from 'lodash/uniqueId'
import styled from 'styled-components';


const Section5 = () => {

  const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/home'  
  const [information,setInformation] = useState()
  const fetchApi = async() => {
      const response = await fetch(url)
      const responseJSON = await response.json();
      setInformation(responseJSON)
  }


  const [hasDataLoaded,setSelectedCard] = useState();
  const [idAccordion, setUniqueId ] = useState();


  const setInitialCard = (e) => {
    const coverElement = document.getElementsByClassName('cover__wrap--accordion');
    
    if ( coverElement.length > 0 ) {
        for (let index = 0; index < coverElement.length; index++) {
            const element = coverElement[index];
            let childrenElements = element.querySelectorAll('.card-item');
            setHoverCard(childrenElements[0], childrenElements);
        }
        setSelectedCard(true);
    }
}
const toggleHover = (id,index) => (e) => {
  e.preventDefault();
  let wrapElement = e.target.closest('.card-item'),
      parentElement = wrapElement.parentNode,
      siblingsElements = parentElement.querySelectorAll('.card-item');
  if ( wrapElement){
      setHoverCard(wrapElement,siblingsElements,id,true);
  }
};

const setHoverCard = (wrapElement,siblingsElements, id, fromHover) => {
  for (let index = 0; index < siblingsElements.length; index++) {
      const siblingElement = siblingsElements[index],
            siblingElementDescription = siblingElement.querySelector('.card__description'),
            siblingId = siblingElement.id;
      siblingElement.classList.remove("active");
      
      if ( fromHover && ( id != siblingId ) ){
          siblingElementDescription.classList.remove("active-description");
      }
  }

  if ( wrapElement ) {
      wrapElement.classList.add("active");
      
      setTimeout(() => {
          wrapElement.querySelector('.card__description').classList.add("active-description");
      }, 180);
  }
}



  useEffect(() => {
    fetchApi()
    setUniqueId(uniqueId('accordion-id'));


    if ( information && !hasDataLoaded ) {
      setInitialCard();
  }
  },[]);


  return (
    <CardContainer5>
            { !information ? '':
                <Title className='section__header'>
                    <h3>{information.titleSection5}</h3>
                <div>
                    {(() => {
                        
                            return(
                                <a href ={information.URLSection5}> 
                                    <GoToIcon></GoToIcon>
                                    <span>Ver todas</span>
                                </a>
                            )
                        
                    })()}
                </div>
            </Title>
            }
            <CardContainerWrapAccordion>
                <ItemsAccordion className='cover__wrap--accordion' id={idAccordion} >
                { !information ? '':
                    information.info5.map((element,index) => {
                        let shortDescription = `${(element.metadescription[0].substr(0, 100)).trim()}...`;
                        return (
                            
                            <CardContent key = {element.id+'-'+idAccordion} id ={'el-'+element.id+'-'+idAccordion} onMouseEnter={toggleHover('el-'+element.id+'-'+idAccordion,index)} className="card-item">
                                <div className='card__background--wrap'>
                                    <div className='card__background' style={{backgroundImage: `url(${element.image})`}}></div>
                                </div>
                                <div className='card__description'>
                                    <a href={element.url} className='title-link'>
                                        <h2>
                                            {(element.title)}
                                        </h2>
                                    </a>
                                    <p>{shortDescription}</p>
                                    <a className='link__general--go-to' href={element.url}>
                                        <GoToIcon></GoToIcon>
                                        <span>Ver más</span>
                                    </a>
                                </div>
                            </CardContent>
                        )
                    })
                }
                </ItemsAccordion>
            </CardContainerWrapAccordion>
        </CardContainer5>
  )
}

export default Section5

const Title = styled.div`
    h3{ 
        text-transform: uppercase;
    }
    
`


const CardContainer5 = styled.div`
    max-width: 870px;
    margin: 0 auto 58px;
    position: relative;
`
const ItemsAccordion = styled.div`
    height: 326px;
    display: flex;
`
const CardContainerWrapAccordion = styled.div`
`


const CardContent = styled.div`
    width: calc( calc( 100% - 30px) / 6 );
    margin: 0 3px;
    transition: width 500ms cubic-bezier(0.190,1.000,0.220,1.000);
    position: relative;
    .card__description{
        position: absolute;
        display: block;
        bottom: 0;
        box-sizing: border-box;
        padding: 0px 16px 16px;
        color: white;
        z-index: 4;
        opacity: 0;
        transition: opacity 500ms cubic-bezier(0.190,1.000,0.220,1.000);
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
            color: white;
        }
        p{
            font-size: 13px;
            color: #868495;
            margin:8px 0 0;
            padding:0;
            color: white;
        }
    }
    &.active{
        width: calc( calc( calc( 100% - 30px) / 6 ) * 2 );
        transition: width 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        &::after{
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            background-image: linear-gradient(to top,rgba(0,0,0,.6) 0,transparent 70%);
            content: "";
            display: block;
            z-index: 3;
        }
        .card__description.active-description{
            opacity: 1;
            transition: opacity 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        }
        @media (max-width: 767px) {
            width: calc( calc( calc( 100% - 30px) / 6 ) * 7 );
        }
    }
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
    &:hover{
        .card__background{
            transform: scale(1.2);
        }
    }
    
`
