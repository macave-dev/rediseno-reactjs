import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const RelatedTopics = () => {


    const slug = window.location.pathname
    const slug_f = slug.slice(1)

    const urlTAGS = 'https://eventosyfestivales.com/wp-json/wp/v2/tags/'
    const urlPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${slug_f}`


    const [tags, setTags] = useState([])
    const [dataPost, setDataPost] = useState(null)



    const fetchAPI = async() => {

        const responsePost = await fetch(urlPost)
        const responsePostJSON = await responsePost.json()
        setDataPost(responsePostJSON[0].tags)

        const responseTAGS = await fetch(urlTAGS)
        const responseTAGSJSON = await responseTAGS.json()
        setTags(responseTAGSJSON)
    }

    useEffect(() => {
        fetchAPI()
    },[])

    console.log(dataPost[0])
    console.log(tags)


  return (
    <RelatedTopicContainer>
        <h3>TEMAS RELACIONADOS</h3>

        <RelatedTopicsContent>
            {!dataPost ? null : (
                dataPost.map((tagId => {
                    return(
                        <div key = {tagId}>
                            <Link to = '/'>Hello</Link>
                        </div>
                    )
                }))
            )}
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