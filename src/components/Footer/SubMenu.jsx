import React,{useState,useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SubMenu = () => {

    const url = 'https://eventosyfestivales.com/wp-json/wp-macave/v1/footer';
    const [information,setInformation] = useState();
    const fetchApi = async() => {
        const response = await fetch(url);
        const responseJSON = await response.json();
        setInformation(responseJSON);
        setClass('three-columns')
    }

    useEffect(() => {
        fetchApi();
    },[])




  const [columnsClass,setClass] = useState();
  const ref = useRef();

  useEffect(() => {
    if ( ref.current && information ) {
        if ( information.length > 3 ) {
            setClass('four-columns')
        }
    }
},[])

  return (
    <Container ref={ref} className={columnsClass}>
            <h4>MENÚ</h4>
            <ul>
                {!information ?  null : (
                    information.map((item,id) => {
                        return(
                            <li key = {id}>
                                 <Link target = '_blank' to={item.url}>{item.title}</Link>
                            </li>
                        )}))}
            </ul>
        </Container>
  )
}

export default SubMenu

const Container = styled.div`
    ul{
        padding:0;
        list-style: none;
        li{
            margin-bottom: 20px;
            a{
                text-decoration: none;
                font-size: 14px;
                color: #4C4A58;
            }
        }
    }
    &.four-columns{
        grid-column: span 4;
        & + div {
            grid-column: span 2;
            & + div {
                grid-column: span 2;
            }
        }
        ul{
            -moz-column-count: 2;
            -moz-column-gap: 20px;
            -webkit-column-count: 2;
            -webkit-column-gap: 20px;
            column-count: 2;
            column-gap: 20px;
        }
    }
    &.three-columns{
        grid-column: span 3;
        & + div {
            grid-column: span 3;
            & + div {
                grid-column: span 2;
            }
        }
    }
`