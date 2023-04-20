import styled from "styled-components";
import { logoFont, titleFont } from "../../constants/fonts";
import background from "../images/chessbackgroung.png";

export const PublicMain = styled.main`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: flex-start;
  justify-content: space-evenly;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  background-image: url(${background});
  background-size: cover;
`;

export const LogoBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  font-weight: 700;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60%;
  height: 100vh;
  color: #ffffff;
  background-color: #151515;
  opacity: 0.9;

  h1 {
    font-family: ${logoFont};
    font-size: 76px;
    line-height: 84px;
  }
  h2 {
    font-size: 23px;
    line-height: 34px;
    font-weight: 400;
    text-align: center;
  }
  img {
    width: 200px;
    border-radius: 100px;
  }

  @media (max-width: 868px) {
    display: none;
  }
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(21, 21, 21, 0.3);
  width: 100%;
  margin: 0;
  height: 60%;
  padding: 8vh 0.3vw;
  gap: 20px;
  color: #fff;
  font-family: ${titleFont};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);

  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
  }
  h3 {
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
  }
  span {
    color: #3498db;
  }
  button {
    width: 100%;
    height: 55px;
    font-weight: 700;
    font-family: ${titleFont};
    background-color: #000;
    color: #2f80ed;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 2px solid #2f80ed;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2b72c3;
    }
  }

  @media (min-width: 868px) {
    margin: 0 50px;
    width: 40%;
    height: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  textarea {
    resize: none;
  }

  input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border-radius: 6px;
  }
  button {
    width: 100%;
    height: 55px;
    background-color: #000;
    color: #2f80ed;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 2px solid #2f80ed;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    font-family: ${titleFont};

    &:hover {
      background-color: #2b72c3;
    }
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-decoration-line: underline;

  color: #ffffff;
`;

export const Main = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  @media (max-width: 868px) {
    width: 100vw;
  }
`;

export const Title = styled.h2`
  font-family: ${titleFont};
  font-weight: 700;
  font-size: 32px;
  line-height: 49px;
  color: #ffffff;
  margin-top: 45px;
  width: 100%;

  @media (min-width: 868px) {
    font-size: 43px;
    line-height: 64px;
  }
`;

export const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  align-items: flex-start;
  gap: 15px;

  @media (max-width: 868px) {
    width: 100vw;
  }
`;