import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/HomeSections/Home'
import styled from 'styled-components'
import CategoriesPage from './components/Views/CategoriesPage'
import PostPage from './components/Views/PostPage'
import Footer from './components/Footer/Footer'
import AuthorPage from './components/Views/AuthorPage'
import TagsPage from './components/Views/TagsPage'
import axios from 'axios'
import PrivacyPage from './components/Views/PrivacyPage'
import ContactPage from './components/Views/ContactPage'
import IntroducePage from './components/Views/IntroducePage'
import TermsAndConditions from './components/Views/TermsAndContionsPage'

const App = () => {

  const current_url = `https://eventosyfestivales.com${window.location.pathname}`

  const [schema,setSchema] = useState(null)

  axios.get(`https://eventosyfestivales.com/wp-json/wp-macave/v1/schema`).then(
    (response) => {
      setSchema(response.data)
    }
  )



  return (
    <>
      {!schema ? null : 
      <>
  
        {/* DEFINE SCHEMA */}
        <script type="application/ld+json">
          {
            `{
              "@context": "http://schema.org/",
              "@type": "NewsMediaOrganization",
              "name" : "${schema.Name}",
              "url" : "${schema.URL}",
              "logo": "${schema.Logo}",
              "description" : "${schema.Description}",
              "actionableFeedbackPolicy": "${schema.Policy}",
              "foundingDate": "",
              "sameAs": ""
            }`
          }
        </script>

        {/* MAIN META TAGS */}
        <meta data-rh="true" name="description" content={schema.Description}/>
        <meta data-rh="true" property="fb:pages" content={schema.FacebookPages}/>
        <meta data-rh="true" property="fb:app_id" content={schema.FacebookId}/>
        <meta data-rh="true" property="og:type" content="article"/>
        <meta data-rh="true" property="og:title" content={schema.Name}/>
        <meta data-rh="true" property="og:site_name" content={schema.Name}/>
        <meta data-rh="true" property="og:url" content={current_url}/>
        <meta data-rh="true" property="og:image" content={schema.SiteImage}/>
        <meta data-rh="true" property="og:description" content={schema.Description}/>
        <title data-rh="true">{schema.Name} | {schema.Description}</title>
      </>
      }

      <Header/>
      
      <Main>
        <Routes>
          <Route path ='/' element = {<Home/>}/>
          <Route path = 'terminos-y-condiciones' element = {<TermsAndConditions/>}/>
          <Route path = 'quienes-somos' element = {<IntroducePage/>}/>
          <Route path = 'contacto' element = {<ContactPage/>}/>
          <Route path = 'politica-de-privacidad' element = {<PrivacyPage/>}/>
          <Route path='/tag/:slug' element = {<TagsPage/>}/>
          <Route path = '/author/:slug' element = {<AuthorPage/>}/>
          <Route path='/category/:slug' element = {<CategoriesPage/>}/>
          <Route path = "/:slug" element = {<PostPage/>}/>
        </Routes>
      </Main>
      <Footer/>
    </>
  
  )
}
export default App;


const Main = styled.div`
max-width: 1200px;
  padding: 1em 0;
  margin: auto;
  img {
    max-width: 100%;
  }
  h2 {
    margin: 0.5em 0;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }
  .section{
    &[data-type="default"]{
      max-width: 870px;
      margin: auto;
    }
  }
  .section__header {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    max-width: 870px;
    margin: 0 auto 40px;
    & > div{
      &:last-child{
        justify-self: end;
      }
    }
    h3{
      font-size: 17px;
      font-weight: 600;
      text-transform: uppercase;
    }
    a{
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
      color: black;
      display: grid;
      grid-template-columns: 16px auto;
      grid-gap: 8px;
      align-items: center;
      i{
        display: inline-flex;
        img{
          display: block;
        }
      }
      svg{
        max-width: 16px;
      }
    }
  }
  .button__general--go-to{
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    color: black;
    display: grid;
    grid-template-columns: 16px auto;
    grid-gap: 8px;
    align-items: center;
    i{
      display: inline-flex;
      img{
        display: block;
      }
    }
    span{
      margin-bottom: 0px;
      color: #000;
      font-size: 15px;
    }
  }
  div.button__general--go-to, .link__general--go-to{
    float: right;
    margin-top: 20px;
    display: grid;
    width: fit-content;
    grid-template-columns: 12px auto;
    grid-gap: 8px;
    align-items: center;
    svg{
      color: white;
      max-width: 16px;
    }
    span{
      color: white;
      font-size: 13px;
      font-weight: 300;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      display: inline-block;
    }
  }
  @media (max-width: 769px){
    padding: 1em 20px;
  }
}
`