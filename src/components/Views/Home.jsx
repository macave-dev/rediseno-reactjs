import React, {Suspense,lazy, useState, useEffect} from 'react'
import YoutubeVideo from '../HomeSections/YoutubeVideo'
import {Helmet} from "react-helmet";
import Axios from 'axios'

const Section1 = lazy(() => import('../HomeSections/Section1'))
const Section2 = lazy(() => import('../HomeSections/Section2'))
// const Section3 = lazy(() => import('./Section3'))
const Section4 = lazy(() => import('../HomeSections/Section4'))
const Section5 = lazy(() => import('../HomeSections/Section5'))
const Section6 = lazy(() => import('../HomeSections/Section6'))
const Section7 = lazy(() => import('../HomeSections/Section7'))
const Section8 = lazy(() => import('../HomeSections/Section8')) 
const Section9 = lazy(() => import('../HomeSections/Section9')) 
const Section10 = lazy(() => import('../HomeSections/Section10'))


const Home = () => {

  const [schema,setSchema] = useState(null)
  const current_url = `https://eventosyfestivales.com`

  useEffect(() => {
    Axios.get(`https://eventosyfestivales.com/wp-json/wp-macave/v1/schema`).then(
      (response) => {
        setSchema(response.data)
      })
  },[])
 


  return (
    <div>

      {!schema ? null : 
        <>
          {/* DEFINE SCHEMA */}
          <Helmet>
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

            <meta name="description" content={schema.Description}/>
            <meta property="fb:pages" content={schema.FacebookPages}/>
            <meta property="fb:app_id" content={schema.FacebookId}/>
            <meta property="og:type" content="article"/>
            <meta property="og:title" content={schema.Name}/>
            <meta property="og:site_name" content={schema.Name}/>
            <meta property="og:url" content={current_url}/>
            <meta property="og:image" content={schema.SiteImage}/>
            <meta property="og:description" content={schema.Description}/>
            <title data-rh="true">{schema.Name} | {schema.Description}</title>
          </Helmet>
        </>
      }

     
      <Suspense fallback={ null}>
        <Section1/>
      </Suspense>
        <Suspense fallback = {null}>
          <Section2/>
        </Suspense>
        <Suspense fallback = {null}>
          <Section4/>
        </Suspense>
        
        <Suspense fallback = {null}>
          <YoutubeVideo/>
        </Suspense>

        <Suspense fallback = {null}>
          <Section5/>
        </Suspense>

        <Suspense fallback = {null}>
          <Section6/> 
        </Suspense>

        <Suspense fallback = {null}>
            <Section7/>
        </Suspense>
        
        <Suspense fallback = {null}>
          <Section8/>
        </Suspense>
        <Suspense fallback = {null}>
            <Section9/>
        </Suspense>
        <Suspense fallback = {null}>
          <Section10/>
        </Suspense>
    </div>
  )
}

export default Home