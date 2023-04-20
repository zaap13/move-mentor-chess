import styled from "styled-components";
import { logoFont, titleFont } from "../../constants/fonts";

const HeaderStyle = styled.nav`
  background-color: #151515;
  padding: 0 0 0 15px;

  width: 100%;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: ${(props) => (props.isFixed ? "fixed" : "")};
  top: 0;
  left: 0;
  z-index: 2;

  h1 {
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 5%;
    color: #ffffff;
    font-family: ${logoFont};
    padding: 0 15px;
    border-right: solid 0.1px #fff;
    cursor: pointer;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 5%;
    color: #ffffff;
    font-family: ${titleFont};
    padding: 10px;
    border-right: solid 0.1px #fff;
    cursor: pointer;
  }

  @media (max-width: 868px) {
    h1 {
      font-size: 28px;
      padding: 0 5px 0 0;
      border-right: solid 0.1px #fff;
    }
    h2 {
      font-size: 12px;
      padding: 2px;
      border-right: solid 0.1px #fff;
      cursor: pointer;
    }
  }
`;

const LogoutContainer = styled.div`
  position: fixed;
  right: 0;
  width: 100px;
`;

const IconImageProfile = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  img {
    border-radius: 50%;

    width: 44px;
    height: 44px;
  }
  @media (max-width: 868px) {
    img {
    border-radius: 50%;

    width: 24px;
    height: 24px;
  }
  }
`;

const LogoutText = styled.button`
  background-color: #171717;
  border-radius: 0 0 0 20px;

  width: 100%;
  height: 43px;

  display: ${(props) => props.display};

  cursor: pointer;

  position: absolute;
  right: 0;

  a {
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.5px;

    text-decoration: none;
  }
`;

export { HeaderStyle, LogoutContainer, IconImageProfile, LogoutText };
