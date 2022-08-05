import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'
import he from 'he'
import  {Helmet} from 'react-helmet'

const AuthorPage = () => {

  const [author, setAuthor] = useState([])
  const [posts, setPosts] = useState([])

  const slug = (window.location.pathname).split('/author/')[1]


  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/users?slug=${slug}`).then(
    (response) => {
        setAuthor(response.data[0])
    }
  )

  const author_id = author.id
  
  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/posts?author=${author_id}`).then(
    (response) => {
        setPosts(response.data)
    }
  )



  return (
    <>
    <Helmet>
      <title>{author.name}</title>
    </Helmet>
    <Items>
      {/* TITLE */}
      <div>
          {!author ? null : 
            <>
              <h1>Autor: {author.name}</h1>
            </>
          }
        </div>
      {/* CONTENT */}
      <div>
        {!posts ? null : 
          posts.map((post) => {
            return(
              <Container key = {post.id}>
                <a href = {post.link}>
                  <span className='card__background--wrap'>
                    <span className='card__background' style={{backgroundImage: `url(${post.jetpack_featured_media_url})`}}></span>
                  </span>

                  <span>
                    <h3>{he.decode(post.title.rendered)}</h3>
                      <ul>
                        <li>{ dayjs(post.date).format("DD MMMM YYYY")} <span>-</span></li>
                        
                      </ul>
                  </span>
                </a>
              </Container>
            )
          })
        }

      </div>
    </Items>
    
    
    </>
    
  )
}

export default AuthorPage


const Container = styled.div`
  & > a {
    color: black;
    text-decoration: none;
    display: grid;
    grid-template-columns: 140px auto;
    grid-gap: 20px;
    position: relative;
    margin-bottom: 28px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #707070;
    .card__background--wrap{
      position: relative;
      width: 100%;
      height: 130px;
      overflow: hidden;
      border-radius: 10px;
      display: block;
    }
    .card__background{
        display: block;
        position: relative;
        width: 100%;
        height: 130px;
        transform: scale(1);
        transition: transform 500ms cubic-bezier(0.190,1.000,0.220,1.000);
        background-position: center;
        background-size: cover;
    }
    & > span{
      display: block;
      h3{
        display: block;
        color: #4C4A58;
        font-size: 18px;
        font-weight: 500;
        margin-top: 10px;
      }
      ul{
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: auto auto;
        width: fit-content;
        li{
          margin-right: 5px;
          font-size: 14px;
          color: #868495;
        }
      }
    }
    &:hover{
      .card__background{
          transform: scale(1.2);
      }
    }
  }
  @media (max-width: 767px) {
    a{
      display: block;
    }
  }
`


const Items = styled.div`
  display: block;
  max-width: 870px;
  margin: 0 auto 20px;
  h1{
    font-size: 19px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
`
const Header = styled.h3`
  font-weight: 300;
  color: rgba(12, 17, 43, 0.9);
  font-size: 1.6rem;
`;
const Bold = styled.b`
  font-weight: 700;
`;

const W100 = styled.div`
  width: 100%;
`;