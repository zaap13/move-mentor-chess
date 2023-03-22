import styled from "styled-components";
import { logoFont, mainFont } from "../../constants/fonts";

const HeaderStyle = styled.nav`
  background-color: #151515;
  padding: 0 0 0 15px;

  width: 100vw;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
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

const SearchContainer = styled.div`
  margin: 0 10px;
  width: 563px;
  height: 45px;
@media (max-width: 768px) {
    width: 52vw;
}
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  input {
    background-color: #ffffff;
    border-radius: 8px;
    padding-left: 15px;

    width: 100%;
    height: 100%;

    font-size: 19px;

    top: 0;
    left: 0;
  }

  input::placeholder {
    color: #c6c6c6;
  }
`;

const SearchButton = styled.button`
  margin-right: 10px;

  width: 34px;
  height: 34px;

  position: absolute;
  right: 0;
`;

const SearchUserList = styled.div`
  background-color: #e7e7e7;
  border-radius: 0 0 8px 8px;
  margin-top: -10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;

  display: ${(props) => props.display};
`;

const UsersSearched = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  height: 67px;

  padding-left: 17px;

  img {
    width: 39px;
    height: 39px;

    border-radius: 50%;
  }

  p {
    font-family: ${mainFont};
    font-size: 19px;
    color: #515151;
    word-break: break-word;
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
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.5px;

    text-decoration: none;
    }
`;

const UserSearched = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
img {
  margin-right: 10px;
}
`

export {
  HeaderStyle,
  SearchContainer,
  InputContainer,
  SearchButton,
  SearchUserList,
  UsersSearched,
  LogoutContainer,
  IconImageProfile,
  LogoutText,
  UserSearched
};
