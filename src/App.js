import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Views/Home'
import styled from 'styled-components'
import CategoriesPage from './components/Views/CategoriesPage'
import PostPage from './components/Views/PostView/PostPage'
import Footer from './components/Footer/Footer'
import AuthorPage from './components/Views/AuthorPage'
import TagsPage from './components/Views/TagsPage'
import axios from 'axios'
import PrivacyPage from './components/Views/PrivacyPage'
import ContactPage from './components/Views/ContactPage'
import TermsAndConditions from './components/Views/TermsAndContionsPage'
import Page404 from './components/Views/404'
import SearchView from './components/Views/SearchView'

const App = () => {

  return (
    <>
      <Header/>
      <Main>
        <Routes>
          <Route path ='/' element = {<Home/>}/>
          <Route path = 'terminos-y-condiciones-de-uso-aviso-de-privacidad' element = {<TermsAndConditions/>}/>
          <Route path = 'contacto' element = {<ContactPage/>}/>
          <Route path = 'politica-de-privacidad' element = {<PrivacyPage/>}/>
          <Route path='/tag/:slug' element = {<TagsPage/>}/>
          <Route path = '/author/:slug' element = {<AuthorPage/>}/>
          <Route path='/category/:slug' element = {<CategoriesPage/>}/>
          <Route path = "/:slug" element = {<PostPage/>}/>
          <Route path = 'error' element = {<Page404/>} />
          <Route path = 's=:search' element = {<SearchView/>}/>
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