import React, {useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import InterestedPosts from '../InterestedPosts'
import axios from 'axios'
import { Helmet } from 'react-helmet'


const PostPage = () => {

  const current_url = `https://eventosyfestivales.com${window.location.pathname}`

  const [windowState, setWindowState] = useState()
  const ref = useRef();


  const [post,setPost] = useState(null)
  const [categories, setCategories] = useState({})
  const [author, setAuthor] = useState(null)
  const [schema,setSchema] = useState(null)

  const slug = (window.location.pathname).slice(1)

  useEffect(() => {
    axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${slug}`).then(
    (response) => {
      setPost(response.data[0])
    }
  )

  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/categories/`).then(
    (response) => {
      setCategories(response.data)
    }
  )

  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/users/`).then(
    (response) => {
      setAuthor(response.data)
    }
  )


  axios.get(`https://eventosyfestivales.com/wp-json/wp-macave/v1/schema`).then(
    (response) => {
      setSchema(response.data)
    }
  )
  })

  

  useEffect(() => {
    if ( ref.current ) {
      setWindowState( true )
    }
  })

  return (
    <div>  
        {!post || !schema ?  null :
          <Helmet>
            <link data-rh="true" rel="preload" as="image" imagesrcset={post.jetpack_featured_media_url}/>
            <meta data-rh="true" name="description" content={post.yoast_head_json.og_description}/>
            <meta data-rh="true" name="twitter:card" content="summary_large_image"/>
            <meta data-rh="true" name="twitter:site" content={schema.Name}/>
            <meta data-rh="true" name="twitter:title" content={post.title.rendered}/>
            <meta data-rh="true" name="twitter:description" content={post.yoast_head_json.og_description}/>
            <meta data-rh="true" name="twitter:image" content={post.jetpack_featured_media_url}/>
            <meta data-rh="true" name="robots" content="max-image-preview:large"/>
            <meta data-rh="true" property="fb:pages" content={schema.FacebookPages}/>
            <meta data-rh="true" property="fb:app_id" content={schema.FacebookId}/>
            <meta data-rh="true" property="og:type" content="article"/>
            <meta data-rh="true" property="og:title" content={post.title.rendered}/>
            <meta data-rh="true" property="og:site_name" content={schema.Name}/>
            <meta data-rh="true" property="og:image" content={post.jetpack_featured_media_url}/>  
            <meta data-rh="true" property="og:description" content={post.yoast_head_json.og_description}/>
            <title>{post.title.rendered}</title>
          </Helmet>
        }
        
        {!post || !schema ? '':
            <>
                 <script type="application/ld+json">{
                    `{
                        "@context":"https://schema.org",
                        "@type":"NewsArticle",
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${post.link}" 
                        },
                        "headline":"${post.title.rendered}",
                        "image":{
                            "@type":"ImageObject",
                            "url":"${post.jetpack_featured_media_url}",
                            "width":1200,
                            "height":652
                        },
                        "datePublished":"${post.date}", 
                        "dateModified":"${post.date_gmt}", 
                        "author":{
                            "@type":"Person",
                           
                            "jobTitle": "Journalist",
                            
                        },
                        "publisher":{
                            "@type":"Organization",
                            "name":"${schema.Name}",
                            "url": "${current_url}",
                            "logo":{
                              "@type":"ImageObject",
                              "url":"${schema.Logo}" 
                            }
                        }
                    }`
                    }
                </script>
                
            </>
           
        }


      {!post ? null :  
        <Container data-id="post-container" >
          <Title >{post.title.rendered}</Title>

          <DateWrapper>
            <strong>{dayjs(post.date).format("DD MMMM YYYY")} - </strong>
            
          </DateWrapper>


          <Content>
              <LeftSide>
                  <img src = {post.jetpack_featured_media_url} alt = ''></img>
                <ContentInfo>
                  <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                </ContentInfo>
                  <InterestedPosts/>
                  <img alt = '' src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                  
                  
              </LeftSide>

              <RightSide>
                <Advertisement>
                  <img alt = '' src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                  <img alt = '' src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                </Advertisement>
                <Advertisement>
                  <img alt = '' src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                  <img alt = '' src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                </Advertisement>
              </RightSide>
            </Content>
          


        </Container>
      }
    </div>
  )
}

export default PostPage


const Container = styled.div`
  max-width: 870px;
  margin: 0 auto;
  width: 95%;
  @media (max-width: 900px){
    width: 90%;
  }
`;     
const LeftSide = styled.div``
const RightSide = styled.div`
  @media (max-width: 900px){
    display: none;
  }
`
const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 28px;
  color: #4C4A58;
  font-weight: 400;
`;

const DateWrapper = styled.p`
  strong{
    font-size: 13px;
    color: #868495;
    font-weight: 400;
    display: block;
    &:first-of-type{
      margin-bottom: 4px;
    }
  }
`;
const Content = styled.div`
  
  display: grid;
  grid-template-columns: calc( 60% - 18px) calc(40% - 18px);
  grid-gap: 36px;
  margin: 24px 0 50px;
  img, figure{
    max-width: 100%;
    height: auto;
  }
  img{
    border-radius: 10px;
    position: relative;
  }
  figure{
    margin: 32px 0;
    figcaption{
      font-size: 13px;
      font-weight: 400;
      line-height: 15px;
      max-height: 60px;
      margin: 0;
      color: #4C4A58;
    }
  }
  *{
    padding: 0;
  }
  @media (max-width: 900px) {
    display: block;
    img, figure{
      max-width: 80%;
      height: auto;
      margin: 20px auto;
      display: block;
    }
    figure{
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    img, figure{
      max-width: 100%;
      height: auto;
      margin: 20px auto;
      display: block;
    }
    figure{
      text-align: center;
      margin-bottom: 40px;
      img{
        margin: 0;
      }
    }
  }
  p{
    color: #4C4A58;
    font-size: 13px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
  }
`;

const ContentInfo = styled.div`
  margin: 32px 0 0;
  font-size: 15px;
  color: #4C4A58;
  h1, h2, h3, h4, h5, h6{
    font-weight: 500;
    font-size: 15px;
    margin: 34px 0 30px;
  }
  h2{
    font-size: 22px;
  }
  ul, ol{
    padding: 0 0 0 15px;
    li{
      margin-bottom: 10px;
    }
  }
  a{
    text-decoration: none;
    color: #e22658;
    font-weight: 500;
    &:hover{
      text-decoration: underline;
    }
  }
  strong{
    font-weight: 500;
  }
`

const Advertisement = styled.div`
  img{
      margin-bottom: 16px;
      width: 100%;
      height: auto; 
  }
`