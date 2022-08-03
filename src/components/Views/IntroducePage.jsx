import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'



const IntroducePage = () => {

    const [data,setData] = useState()
    const url = 'https://eventosyfestivales.com/wp-json/wp/v2/pages'

    axios.get(url).then(
        (response) => {
            setData(response.data)
        }
    )

  return (
    <Container>
        {!data ? '':
            <>
                {data.map(item => {
                if(item.slug === 'quienes-somos'){
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
  )
}

export default (IntroducePage)




const Container = styled.div`
  max-width: 870px;
  margin: 0 auto;
  width: 95%;
  a{
    text-decoration: none;
    color: steelblue;
  }
`;     
