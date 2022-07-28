import React,{useState,useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SubMenu = ({props}) => {

  const [columnsClass,setClass] = useState();
  const ref = useRef();

  useEffect(() => {
    if ( ref.current && props ) {
        if ( props.length > 3 ) {
            setClass('four-columns')
        }
    }
},[])

  return (
    <Container ref={ref} className={columnsClass}>
            <h4>MENÚ</h4>
            <ul>
                {
                    props.map((item,id) => {
                        return(
                            <li key = {id}>
                                <Link target = '_blank' to={item.url}>{item.title}</Link>
                            </li>
                        )
                    })
                }
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