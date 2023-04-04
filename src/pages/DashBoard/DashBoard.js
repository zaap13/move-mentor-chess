import { useEffect, useState } from "react";
import { Container, Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import useToken from "../../hooks/useToken";
import { BsPlus } from "react-icons/bs";

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
      <Header isFixed={true} />

      <Main>
        <Container>
          <Title>Seus Cursos</Title>
          {userCourses.length ? (
            userCourses.map((c) => <CourseBox key={c.id} course={c} />)
          ) : (
            <NoCourses>
              <p>
                Você ainda não se cadastrou em nenhum curso.
                <br />
                Clique no botão abaixo para ver os cursos disponíveis.
              </p>
              <Button onClick={() => navigate("/courses")}>
                <BsPlus />
                Ver Cursos
              </Button>
            </NoCourses>
          )}
        </Container>
      </Main>
    </>
  );
}

const NoCourses = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  line-height: 1.5;

  p {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00b2ff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out;

  :hover {
    background-color: #008cc9;
    cursor: pointer;
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;
