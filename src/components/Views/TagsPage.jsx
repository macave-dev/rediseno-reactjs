import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'
import he from 'he'
import { Helmet } from 'react-helmet'


const TagsPage = () => {

  const [tag, setTag] = useState([])
  const [posts, setPosts] = useState([])
  let numberOfPage = 1;

  const slug = (window.location.pathname).split('/tag/')[1]

  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/tags?slug=${slug}`).then(
    (response) => {
      setTag(response.data[0])
    }
  )
  
  const loadMorePost = () => {
    axios
    .get(`https://eventosyfestivales.com/wp-json/wp/v2/posts?tags=${tag.id}&page=${numberOfPage}`)
    .then(
      (({data}) => {
        const newPost = [];
        data.forEach( p => newPost.push(p));
        setPosts(oldPosts => [...oldPosts, ...newPost]);
      }));
    numberOfPage += 1;
  };

  const [authors,setAuthors]  = useState([])
  axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/users/`).then(
    (res) => {
        setAuthors(res.data)
    }
  )

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  const handleScroll = (e) => {
    if(window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight){
      loadMorePost();
    }
  }

  useEffect(() => {
    loadMorePost();
    window.addEventListener('scroll', handleScroll);
  },[tag.id]);
  

  return (
    <>
    {!tag ?  null :
      <Helmet> 
        <title>{`${tag.name} archivos`}</title>
      </Helmet>
    }
    
    <Items>
      {/* TITLE */}
      <div>
        {!tag ? null : 
          <>
            <h1>Tag: {tag.name}</h1>
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
                        <li>{ dayjs(post.date).format("DD MMMM YYYY")} <span> - {convertArrayToObject(authors,'id')[post.author].name} </span></li>
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

export default TagsPage


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