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

  width: 100%;
  height: 100%;
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

  @media (min-width: 768px) {
    width: 60%;
    height: 100vh;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 106px;
      line-height: 117px;

      letter-spacing: 0.05em;
    }
    h2 {
      font-size: 43px;
      line-height: 64px;
    }
  }
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  height: 60%;
  padding: 10vw 20px;
  gap: 20px;
  color: #fff;
  font-family: ${titleFont};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);

  h2 {
    font-weight: 700;
    font-size: 48px;
    line-height: 52px;
  }
  h3 {
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
  }
  span {
    color: #3498db;
  }

  @media (min-width: 768px) {
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

  input {
    width: 100%;
    height: 65px;
    background: #ffffff;
    border-radius: 6px;
  }
  button {
    width: 100%;
    height: 55px;
    background: #1877f2;
    border-radius: 5px;
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    cursor: pointer;
    color: #ffffff;
    font-family: ${titleFont};
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  text-decoration-line: underline;

  color: #ffffff;
`;

export const UrlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 10px;
  padding-right: 155px;
  gap: 5px;

  border: 1px solid #4d4d4d;
  border-radius: 11px;

  font-size: 11px;
  line-height: 13px;
  font-weight: 400;
  color: #cecece;
  h2 {
    font-size: 16px;
    line-height: 19px;
  }
  p {
    color: #9b9595;
  }

  h3 {
    color: #cecece;
  }

  @media (min-width: 768px) {
    width: 82%;
    height: 42%;
  }
`;

export const Main = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

export const Title = styled.h2`
  font-family: ${titleFont};
  font-weight: 700;
  font-size: 33px;
  line-height: 49px;
  color: #ffffff;
  margin-top: 45px;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 43px;
    line-height: 64px;
  }
`;

export const Container = styled.div`
  display: flex;
  margin-top: 72px;
  align-items: flex-start;
  justify-content: center;
`;

export const UrlImg = styled.img`
  width: 34%;
  height: 100%;
  border-radius: 0px 12px 13px 0px;
  position: absolute;
  right: 0;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;

  background-color: #ffff;
  border-radius: 26.5px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;
