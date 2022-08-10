import React, { useState, useRef,useEffect } from 'react';
import SearchIcon from '../../svg/searchIcon'
import styled from 'styled-components';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [isOpen, openWrapper] = useState(false);

    const ref = useRef(null);
    const clickSearch = (e) => {
        if ( ref.current ) {
            let searchWidgetStatus = isOpen => !isOpen;
            openWrapper( searchWidgetStatus );
        }
    };
    let searchIconStatusClass =  isOpen ? 'active':'';


    const [enteredValue, setEnteredValue] = useState('');
    const [foundPosts,setFoundPosts] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = () => {

        navigate(`/search/${enteredValue}`);
        window.location.reload()

        window.scrollTo(0, 0);
        openWrapper(false)
        setEnteredValue('')
      };
    


      useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, [enteredValue]);
      

      console.log()

    return (
        <>
        <SearchContentElement >
            <div className={`search-button center-position ${searchIconStatusClass}`} onClick={clickSearch}>
                <div className="search-icon"></div>
            </div>
            <InputWrapper ref={ref} className={ isOpen ? 'open-wrapper':'closed-wrapper'}>
                <div>
                    <FormElement >
                        <input
                            type = 'text'
                            placeholder='Busqueda'
                            onChange = {event => setEnteredValue(event.target.value)}
                        />
                        <button type = 'submit' onClick = {handleSubmit}>
                            <i><SearchIcon ></SearchIcon></i>
                        </button>
                    </FormElement>
                    
                </div>
            </InputWrapper>
        </SearchContentElement>
        </>
    )
}

export default Search

const SearchContentElement = styled.div`
    justify-self: end;
    button{
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        z-index: 5;
        i{
            width: 22px;
            height: 22px;
            display: block;
        }
    }
    &::before{
        position: absolute;
        display: block;
        content: ' ';
        width: 300%;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        top: 0;
        background: white;
        z-index: 2;
    }
    .search-button {
        width: 40px;
        height: 40px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        position: relative;
        z-index: 5;
    }
    .search-button::before {
        content: "";
        position: absolute;
        top: 26%;
        right: 23.5%;
        width: 0;
        height: 2px;
        margin-top: -2px;
        background-color: #000;
        transform: rotate(-45deg);
        transform-origin: right top;
        border-radius: 2px;
    }
    .search-button::after{
        content: "";
        position: absolute;
        bottom: 19.5%;
        right: 23.5%;
        width: 32%;
        height: 2px;
        margin-top: -2px;
        background-color: #000;
        transform: rotate(45deg);
        transform-origin: right bottom;
        border-radius: 0 2px 2px 0;
    }
    .search-icon {
        position: absolute;
        display: block;
        top: 22%;
        left: 25%;
        width: 35%;
        height: 35%;
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        border-color: #000;
      }
    .search-button.active::before,
    .search-button.active::after {
        width: 77.5%;
        border-radius: 2px;
        height: 3px;
    }
    .search-button.active .search-icon {
        width: 0;
        height: 0;
        border-color: transparent;
    }
    .search-button::before,
    .search-button::after,
    .search-button .search-icon {
        transition: all 0.3s ease-in-out;
    }
`
const InputWrapper = styled.div`
    position: absolute;
    left: 0;
    background: #f6f6f6;
    width: 200%;
    padding: 10px 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    @media (max-width: 769px) {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    & > div{
        max-width: 870px;
        margin: 0 auto;
    }
    &.closed-wrapper{
        margin-top: -75px;
        transition: margin 500ms cubic-bezier(0.190,1.000,0.220,1.000);
    }
    &.open-wrapper{
        margin-top: 17px;
        transition: margin 500ms cubic-bezier(0.190,1.000,0.220,1.000);
    }
`
const FormElement = styled.div`
    display: grid;
    grid-template-columns: calc( 100% - 45px) 25px;
    grid-gap: 20px;
    align-items: center;
    margin: 10px 0 5px;
    input{
        height: 34px;
        border-radius: 8px;
        box-shadow: none;
        border: 1px solid rgba(0,0,0,.5);
        outline: none;
        padding: 2px 10px;
        box-sizing: border-box;
    }
`
