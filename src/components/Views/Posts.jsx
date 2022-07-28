import React, { Component } from 'react'
import axios from 'axios'

export class Posts extends Component {

    state = {
        posts : [],
        isLoaded : false
    }



    componentDidMount(){
        axios.get('https://eventosyfestivales.com/wp-json/wp/v2/posts')
            .then(res => this.setState({
                posts : res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }


  render() {
    console.log(this.state)
    return (
      <div>Posts</div>
    )
  }
}

export default Posts