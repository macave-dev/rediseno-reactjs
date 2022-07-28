import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Categories = () => {
  const [categories,setCategories] =  useState([])

  axios.get('https://eventosyfestivales.com/wp-json/wp/v2/categories/')
  .then(
    res => setCategories(res.data)
  )
  .catch(error => console.log(error));


  return (
    <div>
      {!categories ? null : 
        categories.map((item) => {
          return(
            <>
              <Link to = {item.slug} key = {item.id}>{item.name}</Link>
              <br/>
            </>
            
          )
        })
      
      }

    </div>
  )
}

export default Categories