import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Helmet} from "react-helmet";


const PrivacyPage = () => {

    const [data,setData] = useState()
    const url = 'https://eventosyfestivales.com/wp-json/wp/v2/pages'

    axios.get(url).then(
        (response) => {
            setData(response.data)
        }
    )

  return (
    <>
      <Helmet>
        <title>Politica de privacidad</title>
      </Helmet>

    <Container>
        {!data ? '':
            <>
                {data.map(item => {
                if(item.slug === 'politica-de-privacidad'){
                    return(
                    <div>
                        <h1>{item.title.rendered}</h1>
                        <div dangerouslySetInnerHTML={{__html: item.content.rendered}} />
                    </div>   
                    )
                }
                })}
            </>
        }
    </Container>
    
    </>
    
  )
}

export default (PrivacyPage)




const Container = styled.div`
  max-width: 870px;
  margin: 0 auto;
  width: 95%;
  a{
    text-decoration: none;
    color: steelblue;
  }
`;     
