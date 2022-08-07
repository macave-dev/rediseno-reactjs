import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'

const AuthorSection = () => {

    const apiPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`
    const apiAuthor =  `https://eventosyfestivales.com/wp-json/wp/v2/users/`
    
    const [post,setPost] = useState(null)
    const [authors,setAuthors]  = useState([])

    useEffect(() => {
        axios.get(apiPost).then(
            (resPost) => {
                setPost(resPost.data[0])
        }).catch(error => {
            console.log(error)
        })
    })

    useEffect(() => {
        axios.get(apiAuthor).then(
          (resAuthor) => {
            setAuthors(resAuthor.data)
          }).catch(error => console.log(error))
      })
    

  return (
    <React.Fragment>
        {!post || !authors ? null :
            authors.map((author) => {
                if(author.id === post.author){
                    const urlImage = Object.values(author.avatar_urls)
                    
                    return (
                        <AuthorContainer>
                            <h2>SOBRE EL AUTOR</h2>
                            <AuthorImage>
                                <a href = {author.link}>
                                    <img alt = {author.name} src = {urlImage[2]} />
                                </a>
                            </AuthorImage>
                                <h3>{author.name}</h3>
                                <p>{author.yoast_head_json.og_title}</p>
                        </AuthorContainer>
                    )
                }
            })
        }
    </React.Fragment>
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