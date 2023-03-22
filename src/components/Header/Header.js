import {
  HeaderStyle,
  LogoutContainer,
  IconImageProfile,
  LogoutText,
} from "./HeaderStyle";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import character from "../../assets/images/character.png";

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <h1 onClick={() => navigate("*")}>MoveMentor</h1>
      <LogoutContainer>
        <IconImageProfile onClick={() => setClicked(!clicked)}>
          <GoChevronDown
            size="25px"
            color="#FFFFFF"
            display={clicked ? "none" : ""}
          />
          <GoChevronUp
            size="25px"
            color="#FFFFFF"
            display={clicked ? "" : "none"}
          />
          <img src={character} alt="profile" />
        </IconImageProfile>
        <LogoutText
          onClick={() => localStorage.clear()}
          display={clicked ? "block" : "none"}
        >
          <a href="*">Logout</a>
        </LogoutText>
      </LogoutContainer>
    </HeaderStyle>
  );
}
