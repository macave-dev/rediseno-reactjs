import React, {useState,useEffect} from 'react';
import GoToIcon from '../../svg/goToIcon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderSection from '../HeaderSection';

const YoutubeVideo = () => {

    const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/home'
    const [information,setInformation] = useState({})
    const fetchApi = async() => {
        const response = await fetch(url);
        const responseJSON = await response.json();
        setInformation(responseJSON);
    }

    useEffect(() => {
        fetchApi();
    },[])

    const headerSectionProps = {
        text: 'VIDEO'
    }

  return (
    <div>
        
        <HeaderSection props = {headerSectionProps} />
        <VideoContainer>
            <iframe width="560" height="315" src = {`https://www.youtube.com/embed/${information.Video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </VideoContainer>
        
    </div>
  )
}

export default YoutubeVideo



const VideoContainer = styled.div`
    width: 662px;
    height:370px;
    margin: 0 auto 55px;
    iframe{
        width: 100%;
        height: 100%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`