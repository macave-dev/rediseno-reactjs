import React, {useEffect,useState, Suspense,lazy} from 'react'
import axios from 'axios'

const PostPage = lazy(() => import('./PostPage'))


const PostsScrollInfinite = () => {
    
    const apiPost = `https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`

    console.log(`https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${(window.location.pathname).slice(1)}`)

    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('https://eventosyfestivales.com/wp-json/wp-macave/v1/posts_scroll_amp').then(
        response => {
            setPosts(response.data.pages)
        })
    },[])
    


  return (
    <React.Fragment>
        <PostPage props = {apiPost}/>

        {!posts ?  null : 
            posts.map((item) => {
                const slug = item.url.split('https://eventosyfestivales.com/')[1]

                return(
                    <Suspense>
                        <PostPage props = {`https://eventosyfestivales.com/wp-json/wp/v2/posts?slug=${slug}`} />
                    </Suspense>
                )
            })
        }

    </React.Fragment>
  )
}

export default PostsScrollInfinite