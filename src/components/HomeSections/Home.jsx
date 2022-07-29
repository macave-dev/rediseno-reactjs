import React, {Suspense,lazy} from 'react'
import YoutubeVideo from './YoutubeVideo'

const Section1 = lazy(() => import('./Section1'))
const Section2 = lazy(() => import('./Section2'))
// const Section3 = lazy(() => import('./Section3'))
const Section4 = lazy(() => import('./Section4'))
const Section5 = lazy(() => import('./Section5'))
const Section6 = lazy(() => import('./Section6'))
const Section7 = lazy(() => import('./Section7'))
const Section8 = lazy(() => import('./Section8')) 
const Section9 = lazy(() => import('./Section9')) 
const Section10 = lazy(() => import('./Section10'))


const Home = () => {


  return (
    <div>
     
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