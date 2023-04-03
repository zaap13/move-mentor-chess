import styled from "styled-components";
import { logoFont } from "../../constants/fonts";

const HeaderStyle = styled.nav`
  background-color: #151515;
  padding: 0 0 0 15px;

  width: 100%;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: ${(props) => (props.isFixed ? "fixed" : "")};
  top: 0;
  left: 0;
  z-index: 2;

  h1 {
    font-size: 49px;
    font-weight: bold;
    letter-spacing: 5%;
    color: #ffffff;
    font-family: ${logoFont};
  }
`;

const LogoutContainer = styled.div`
  position: relative;

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
