import { useEffect, useState } from "react";
import { Container, Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import useToken from "../../hooks/useToken";
import { BsPlusSquare } from "react-icons/bs";

import { getUserCourses } from "../../services/courseApi";
import CourseBox from "./CourseBox";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DashBoard() {
  const [userCourses, setUserCourses] = useState([]);
  const token = useToken();
  const navigate = useNavigate();

  async function loadUserCourses(token) {
    const result = await getUserCourses(token);
    setUserCourses(result);
    console.log(result);
  }

  useEffect(() => {
    loadUserCourses(token);
  }, [token]);

  return (
    <>
      <Header />

      <Main>
        <Container>
          <Title> Seus Cursos</Title>
          {userCourses.length ? (
            userCourses.map((c) => <CourseBox key={c.id} course={c} />)
          ) : (
            <Text onClick={() => navigate("/courses")}>
              <p>
                Você ainda não se cadastrou em nenhum curso, escolha um agora
                mesmo!
              </p>
              <BsPlusSquare />
            </Text>
          )}
        </Container>
      </Main>
    </>
  );
}

const Text = styled.div`
  display: flex;
  font-size: 50px;
  align-items: center;
  justify-content: center;
  border: solid 1px #ffffff;
  border-radius: 5px;
  padding: 5px;
  color: #ffffff;

  :hover {
    background-color: #c5c5c5;
    color: #000;
    cursor: pointer;
  }
  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: left;
  }
`;
