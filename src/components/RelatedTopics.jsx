import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'


const RelatedTopics = (tags) => {

    const apiPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`

    const [allTags, setAllTags] = useState([])
    const [post,setPost] = useState(null)
    

    useEffect(() => {
        axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/tags`).then(
            (response) => {
                setAllTags(response.data)
            }).catch(error => {console.log(error)});
    })
    
    
    useEffect(() => {        
        axios.get(apiPost).then(
          (resPost) => {
            setPost(resPost.data[0])
          }).catch(error => {
            console.log(error)
          })
      })


  return (
    <RelatedTopicContainer>
        <h3>TEMAS RELACIONADOS</h3>

        <RelatedTopicsContent>
            {!allTags || !post ? null : 
                allTags.map((tag) => {
                
                    if (tag.id === post.tags[0] || tag.id === post.tags[1] ) {
                        return(
                            <div key = {tag.id}>
                                <a href={tag.link}>{tag.name}</a>
                            </div>
                        )}})}
        </RelatedTopicsContent>
    </RelatedTopicContainer>
  )
}

export default RelatedTopics

const RelatedTopicContainer = styled.div`
    h3{
        margin-top: 0;
        font-size: 17px;
        color: #000000;
        font-weight: 500;
        text-transform: uppercase;
    }
`
const RelatedTopicsContent = styled.div`
    margin-top: 44px;
    & > div{
        display: inline-block;
        margin: 0 16px 16px 0;
        text-decoration: none;
        border-radius: 10px;
        color: #000000;
        height: 34px;
        box-sizing: border-box;
        border: 1px solid #000000;
        line-height: 2;
        position: relative;
    }
    a{
        text-decoration: none;
        color: #000000;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        padding: 0 16px;
        height: 34px;
        line-height: 2;
        display: block;
        box-sizing: border-box;
        border-radius: 10px;
    }
`