import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const AuthorSection = ({props}) => {


    const apiPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`
    const apiAuthor =  `https://eventosyfestivales.com/wp-json/wp/v2/users/`
    
    const [post,setPost] = useState(null)
    const [authors,setAuthors]  = useState([])

    useEffect(() => {
        axios.get(apiPost).then(
            (resPost) => {
                setPost(resPost.data[0])
        })

        axios.get(apiAuthor).then(
            (resAuthor) => {
              setAuthors(resAuthor.data)
            })        
    },[])

    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };

    const authorsObject = convertArrayToObject(authors,'id')[props];

  return (
    <AuthorContainer>
        <h2>SOBRE EL AUTOR</h2>
        
        {!authorsObject ? null : (
            <React.Fragment>
                <AuthorImage>
                    <a href = {authorsObject.link}>
                        <img src = {Object.values(authorsObject.avatar_urls)[2]} ></img>
                    </a>
            </AuthorImage>
                <h3>{authorsObject.name}</h3>
                <p>{authorsObject.yoast_head_json.og_title}</p>
            </React.Fragment>
        )}
    </AuthorContainer>
  )
}

export default AuthorSection

const AuthorContainer = styled.div`
    margin: 64px 0 28px;
    h2{
        margin: 0 0 12px;
        font-size: 17px;
        color: #000000;
        font-weight: 500;
        text-transform: uppercase;
    }
    h3{
        color: #4C4A58;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 12px;
    }
    p{
        color: #868495;
        font-size: 13px;
        font-weight: 400;
        text-align: center;
    }
`
const AuthorImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 70px;
  width: 70px;
  margin: 0 auto 4px;
`