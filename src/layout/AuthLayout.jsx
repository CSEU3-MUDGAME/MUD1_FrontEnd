import React from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = ({ component: Component, page, ...rest }) => {
  if (localStorage.getItem("token")) {
    window.location.href = "/world";
  }
  return (
    <Route
      {...rest}
      render={props => {
        return (
          <OuterContainer>
            <InnerContainer>
              <ImageContainer />

              <TextContainer>
                <Image src="logo.png" width="100px" />
                <Nav>
                  <Button to="/login" page={page} for="login">
                    LOGIN
                  </Button>
                  <Button to="/register" page={page} for="register">
                    REGISTER
                  </Button>
                </Nav>
                <Component {...props} />
              </TextContainer>
            </InnerContainer>
          </OuterContainer>
        );
      }}
    />
  );
};

const OuterContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #e2fee4;

  @media (max-device-width: 425px) {
    width: 100vw;
    background: #333;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Image = styled.img`
  margin: 10px auto;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 70vh;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #6df7b1; */
  /* background: #c5fed0; */
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 3px 4px 17px 2px rgba(0, 0, 0, 0.75);
  width: 40vw;
  background-image: url("assets/login.jpg");
  background-position: center;

  @media (max-device-width: 768px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  width: 35vw;
  background: #333;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 3px 4px 17px 2px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  @media (max-device-width: 768px) {
    width: 90vw;
  }
  @media (max-device-width: 425px) {
    width: 100vw;
    background: #333;
    box-shadow: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  font-family: "Oxanium", cursive;
`;

const Button = styled(Link)`
  border: none;
  background: none;
  font-size: 30px;
  color: ${props => (props.page === props.for ? "white" : "grey")};
  opacity: ${props => (props.page === props.for ? 1 : 0.7)};
  font-family: "Oxanium", cursive;
  text-decoration: none;
`;

export default AuthLayout;
