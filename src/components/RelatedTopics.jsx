import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'


const RelatedTopics = ({tags}) => {


    const [allTags, setAllTags] = useState(null)


    useEffect(() => {
        axios.get(`https://eventosyfestivales.com/wp-json/wp/v2/tags`).then(
            (response) => {
                setAllTags(response.data)
            }).catch(error => {console.log(error)});
    })
    
    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };
    
      
    const count = [0]

  return (
    <RelatedTopicContainer>
        <h3>TEMAS RELACIONADOS</h3>

        <RelatedTopicsContent>
            
            {!tags || !allTags ? null : (
                <>
                    {count.map((c) => {
                        const tag1 = convertArrayToObject(allTags,'id')[1378]
                        const tag2 = convertArrayToObject(allTags,'id')[2717]
                        const tag3 = convertArrayToObject(allTags,'id')[2714]

                        return(
                            <React.Fragment key = {c}>
                                <div>
                                    <a href = {tag1.link}>{tag1.name}</a>
                                </div>
                                <div>
                                    <a href = {tag2.link}>{tag2.name}</a>
                                </div>
                                <div>
                                    <a href = {tag3.link}>{tag3.name}</a>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </>
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