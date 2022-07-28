import React from 'react';

import Logo from './Logo'
import Menu from './Menu';
import styled from 'styled-components';
import Search from './Search';

const HeaderWrapper = ({props}) => {
    return (
        <HeaderWrapperElement className={props}>
            <Menu />
            <Logo/>
            <Search/>
        </HeaderWrapperElement>
    )
}

export default (HeaderWrapper)

const HeaderWrapperElement = styled.div`
    max-width: 870px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, calc(100%/3));
    align-items: center;
    min-height: 70px;
    & > div{
        position: relative;
        z-index: 5;
        &:last-of-type{
            position: initial;
            z-index: 3;
        }
    }
    @media (max-width: 768px){
        width: 95%;
    }
`