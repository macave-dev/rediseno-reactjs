import React, { useEffect, useRef } from "react";
import GoToIcon from "../../svg/goToIcon";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Page404 = () => {

    const error_image = 'https://github.com/macave-dev/seuno/blob/main/packages/macave-package/src/assets/404.png?raw=true'
    
    const titleEl = useRef(null);

  return (
    <>
        <Helmet>
            <title>404 - Not Found</title>
        </Helmet>
        <Container>
            <img src={error_image}/>
            <Description>
                <p ref={titleEl} tabIndex="-1">Algo salió mal con la ruta, te invitamos a regresar y seguir navegando</p>
                <a href='/'>
                    <i><GoToIcon></GoToIcon></i>
                    <span>Continuar navegando</span>
                </a>
            </Description>
        </Container>
    </>
  )
}

export default Page404


const Container = styled.div`
  display: grid;
  max-width: 870px;
  margin: 120px auto;
  grid-template-columns: 50% 50%;
  grid-gap: 25px;
  align-items: center;
  width: 90%;
  justify-content: center;
  img{
    max-width: 100%;
  }
  @media (max-width: 767px) {
    display: block;
    margin: 70px auto;
    img{
      margin-bottom: 50px;
    }
  }
`;

const Description = styled.div`
  p{
    font-size: 17px;
    color: #000000;
    margin: 0 0 40px;
  }
  a{
    display: grid;
    grid-template-columns: 16px auto;
    grid-gap: 10px;
    align-items: center;
    text-decoration: none;
    font-size: 15px;
    color: #407BFF;
  }
  @media (max-width: 767px) {
    text-align: center;
    a{
      width: fit-content;
      margin: 0 auto;
    }
  }
`;