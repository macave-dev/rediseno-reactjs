import React, { useRef, useEffect, useState } from 'react';
import { FacebookShareButton, EmailShareButton, TwitterShareButton, FacebookMessengerShareButton, WhatsappShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import FbIcon from '../svg/fbIcon';
import TwitterIcon from '../svg/twitterIcon';
import EmailIcon from '../svg/emailIcon';
import MessengerIcon from '../svg/messengerIcon';
import WhatsAppIcon from '../svg/whatsAppIcon';
import styled from 'styled-components';
import axios from 'axios';
import he from 'he'


const SharePostBar = ({props}) => {

  const slug = (window.location.pathname).slice(1)
  const [post,setPost] = useState('')
  const ref = useRef();

    useEffect(() => {
        axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${slug}`).then(
            (response) => {
            setPost(response.data[0])
        })
    })

    useEffect(() => {
        if ( props ) {
            if ( ref.current ) {
                calculateShareBannerPosition();
                window.addEventListener("resize", calculateShareBannerPosition);
                return () => window.removeEventListener("resize", calculateShareBannerPosition);
            }
        }
    })

    const calculateShareBannerPosition = (e) => {
        if ( window.innerWidth >= 1024 ) {
            let postContainer = document.querySelector('[data-id="post-container"]');
            ref.current.style.left = `${postContainer.offsetLeft - 70}px`;
            return
        }
        ref.current.removeAttribute('style');
    }
  return (
    <ShareBar  ref={ref}>
        {!post ?  null : 
             <ul>
                <li>
                    <WhatsappShareButton title={he.decode(post.title.rendered)} 
                    url={post['guid']['rendered']}
                    >
                        <i>
                            <WhatsAppIcon></WhatsAppIcon>
                        </i>
                    </WhatsappShareButton>
                </li>
                <li>
                    <FacebookShareButton
                        url={post['guid']['rendered']}    //eg. https://www.example.com
                        quotes={he.decode(post.title.rendered)}  //"Your Quotes"
                        hashtag='' // #hashTag
                        >
                        <i>
                            <FbIcon></FbIcon>
                        </i>
                    </FacebookShareButton>
                </li>
                <li>
                    <EmailShareButton subject={he.decode(post.title.rendered)} body={post.title.rendered}  url={post['guid']['rendered']}>
                        <i>
                            <EmailIcon></EmailIcon>
                        </i>
                    </EmailShareButton>
                </li>
                <li>
                    <TwitterShareButton title={he.decode(post.title.rendered)}  url={post['guid']['rendered']}>
                        <i>
                            <TwitterIcon></TwitterIcon>
                        </i>
                    </TwitterShareButton>
                </li>
                <li>
                    <FacebookMessengerShareButton appId="1756014794581686" 
                    url={post['guid']['rendered']}
                    redirectUri={post['guid']['rendered']}
                    >
                        <i>
                            <MessengerIcon></MessengerIcon>
                        </i>
                    </FacebookMessengerShareButton>
                </li>
            </ul>
        }
        
    </ShareBar>
  )
}

export default SharePostBar


const ShareBar = styled.div`
    ul{
        padding: 8px 10px;
        list-style: none;
        border-radius: 0 8px 8px 0px;
        background: white;
        li{
            button{
                width: 22px;
                height: 22px;
            }
            margin-bottom: 16px;
        }
    }
    @media (min-width: 981px) {
        position: fixed;
        left: 0;
        z-index: 9999;
        margin-top: 70px;
    }
    @media (max-width: 980px) {
        margin: 14px 0 25px;
        background: white;
        z-index: 99;
        width: 100%;
        ul{
            display: grid;
            grid-template-columns: repeat(5, calc( calc(100% - 60px) / 5));
            grid-gap: 15px;
            width: fit-content;
            margin: 0 auto;
            li{
                margin-bottom: 0;
            }
        }
    }
`