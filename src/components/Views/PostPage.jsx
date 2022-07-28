import React, {useState,useEffect, useRef} from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const PostPage = () => {

  const urlPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts${window.location.pathname}`
  const urlCategories = `https://eventosyfestivales.com/wp-json/wp/v2/categories/`
  const urlAuthors = `https://eventosyfestivales.com/wp-json/wp/v2/users/`
  

  const [dataPost, setDataPost] = useState()
  const [dataCategories, setDataCategories] = useState()
  const [dataAuthor, setDataAuthor] = useState()


  const fetchAPI = async() => {
    const responsePost = await fetch(urlPost)
    const responsePostJSON = await responsePost.json()

    const responseCategories = await fetch(urlCategories)
    const responseCategoriesJSON = await responseCategories.json()


    const responseAuthor = await fetch(urlAuthors)
    const responseAuthorJSON = await responseAuthor.json()

    setDataPost(responsePostJSON)
    setDataCategories(responseCategoriesJSON)
    setDataAuthor(responseAuthorJSON)
  }


  useEffect(() => {
    fetchAPI()
  })


  

  const [windowState, setWindowState] = useState()
  const ref = useRef();

  useEffect(() => {
    if ( ref.current ) {
      setWindowState( true )
    }
  })

  

  return (
    <div>
      {!dataPost || !dataCategories || !dataAuthor ? null :(
        <Container> 
           <Title >{dataPost.title.rendered}</Title>

          <DateWrapper>
              {/* <strong>{dayjs(dataPost.date).format("DD MMMM YYYY")} - {dataCategories[dataPost.categories[0]].name}</strong> */}
              {/* <strong>Autor: {state.source.author[post.author].name} </strong><br/> */}
            </DateWrapper>


            <Content>
              <LeftSide>
                {/* <img src = {post.jetpack_featured_media_url} alt = {state.source.attachment[post.featured_media].alt_text}></img> */}
                {/* <Html2React html={state.source.attachment[post.featured_media].caption.rendered} /> */}
                <ContentInfo>
                    <div dangerouslySetInnerHTML={{__html: dataPost.content.rendered}}/>
                  </ContentInfo>
                  {/* <InterestedPosts/> */}
                  {/* <Slot name = '/21802911858/Anuncios-AdSense-SeUno-300x250' /> */}
              </LeftSide>
              <RightSide>
                <Advertisement>
                  {/* <Slot name = {slideAds[counter]} /> */}
                </Advertisement>
                <Advertisement>
                  
                </Advertisement>
              </RightSide>
              </Content>
              {/* <RelatedPosts props = {category_post}/> */}
              <Content>
                <LeftSide>
                  {/* {post.tags && <RelatedTopics tags = {post.tags}/> } */}
                  {/* <Author props = {state.source.author[post.author]}/> */}
                </LeftSide>
                <RightSide>
                <Advertisement>
                  {/* <img src="https://via.placeholder.com/330X282.png?text=Publicidad"/>
                  <img src="https://via.placeholder.com/330X282.png?text=Publicidad"/> */}
                </Advertisement>
              </RightSide>
              </Content>

        </Container>
      )}
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