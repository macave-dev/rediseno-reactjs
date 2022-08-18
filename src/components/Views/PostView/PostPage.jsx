import React, {useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import InterestedPosts from '../../InterestedPosts'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import SharePostBar from '../../SharePostBar'
import he from 'he'
import RelatedPosts from '../../RelatedPosts'
import AuthorSection from '../../AuthorSection'
import RelatedTopics from '../../RelatedTopics'

const applyTaboola = () => {
  if (document.getElementById("taboola-below-article-thumbnails").innerHTML.length) return;
      let _taboola;
      window._taboola = window._taboola || [];
      _taboola.push({
      mode: 'alternating-thumbnails-a',
      container: 'taboola-below-article-thumbnails',
      placement: 'Below Article Thumbnails',
      target_type: 'mix'
    });
    
    window._taboola.push({ flush: true });
}


const PostPage = () => {

  const current_url = `https://eventosyfestivales.com`
  const apiPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`

  const [post,setPost] = useState(null)
  const [allCategories,setAllCategories] = useState([])
  const [schema,setSchema] = useState({})
  const [windowState, setWindowState] = useState()
  const [authors,setAuthors]  = useState(null)
  
  const ref = useRef();

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
  
  useEffect(() => {
    axios.get(apiPost).then(
      resPost => {
        setPost(resPost.data[0])
      }
    )

    axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/categories/`).then(
      (resCategory) => {
        setAllCategories(convertArrayToObject(resCategory.data,'id'))
      })

    
    axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/users/`).then(
      res => {
        setAuthors(convertArrayToObject(res.data,'id'))
    })

    axios.get(`https://eventosyfestivales.com/wp-json/wp-macave/v1/schema`).then(
      res => {
        setSchema(res.data)
    })

    

    setWindowState( false );
  },[apiPost])

  
  useEffect(() => {
    if ( ref.current ) {
      setWindowState( true )
    }

  })

  
  return (
    <div>  
        {!post || !authors || !schema ? null:
              <Helmet>
                 <script type="application/ld+json">{
                    `{
                        "@context":"https://schema.org",
                        "@type":"NewsArticle",
                        "mainEntityOfPage":{
                          "@type":"WebPage",
                          "@id":"${post.link}" 
                        },
                        "headline":"${he.decode(post.title.rendered)}",
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
                            "name":"${authors[post['author']].name}", 
                            "jobTitle": "Journalist",
                            "url":"${authors[post['author']].link}"
                        },
                        "publisher":{
                            "@type":"Organization",
                            "name":"${schema.Name}",
                            "url": "https://eventosyfestivales.com",
                            "logo":{
                              "@type":"ImageObject",
                              "url":"https://i0.wp.com/eventosyfestivales.com/wp-content/uploads/2022/04/cropped-eyf-png-1.png?fit=512%2C512&ssl=1" 
                            }
                        }
                    }`
                    }
                </script>

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
                <meta data-r ="true" property="og:type" content="article"/>
                <meta data-rh="true" property="og:title" content={post.title.rendered}/>
                <meta data-rh="true" property="og:site_name" content={schema.Name}/>
                <meta data-rh="true" property="og:url" content={`https://eventosyfestivales.com${window.location.pathname}`}/>
                <meta data-rh="true" property="og:description" content={post.yoast_head_json.og_description}/>
                <link rel="canonical" href={`https://eventosyfestivales.com${window.location.pathname}`}/>
                <title>{he.decode(post.title.rendered)}</title>
              </Helmet>
        }

      
      <Helmet>
        <meta data-rh="true" property="og:image" content="https://softwaretestinglead.com/wp-content/uploads/2022/04/Frameworks-for-React-JS.jpg"/>  
      </Helmet>


      
      {!post || !allCategories || !authors  ? null :  
      <React.Fragment>
        <SharePostBar props = {windowState}/>
        <Container data-id="post-container" >
          <Title >{he.decode(post.title.rendered)}</Title>

          <DateWrapper>
            <strong>{dayjs(post.date).format("DD MMMM YYYY")}  </strong>
            <strong>Autor: {authors[post.author].name}</strong><br/>
          </DateWrapper>


          <Content>
              <LeftSide>
                <img src = {post.jetpack_featured_media_url} alt = ''></img>

                
                <ContentInfo>
                  <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                </ContentInfo>
                
                <InterestedPosts/>
                  <div className="taboola-section">
                    <div id="taboola-below-article-thumbnails"></div>
                  </div>
              </LeftSide>

              <RightSide>
                <Advertisement>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                </Advertisement>
                <Advertisement>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                </Advertisement>
              </RightSide>
            </Content>

            <RelatedPosts categoryID = {post.categories[0]}/>

            <Content>
              <LeftSide>
                <RelatedTopics tags = {post.tags}/> 
                <div className="taboola-section">
                  <div id="taboola-below-article-thumbnails"></div>
                </div>
                <AuthorSection props = {post.author}/>
              </LeftSide>
              <RightSide>
                <Advertisement>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                  <img alt = '' src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/12/277023-whatsapp-facebook-anuncios-publicidad.png?itok=F5XWFINh"/>
                </Advertisement>
              </RightSide>
            </Content>
        </Container>


      </React.Fragment>
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
const PostInfo = styled.div`
    background-image: linear-gradient(to right, #f4f4f4f, #fff);
    margin-bottom: 1em;
    padding: 0.5em;
    border-left: 4px solid lightseagreen;
    font-size: 0.8em;
    & > a{
        margin: 0px;
    }
`
const Advertisement = styled.div`
  img{
      margin-bottom: 16px;
      width: 100%;
      height: auto; 
  }
`
const Paragraph = styled.div`
  display: block;
  margin-bottom: 10px;
`
