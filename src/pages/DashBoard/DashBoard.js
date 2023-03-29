import { useEffect, useState } from "react";
import { Container, Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import useToken from "../../hooks/useToken";

import { getUserCourses } from "../../services/courseApi";
import CourseBox from "./CourseBox";

export default function DashBoard() {
  const [userCourses, setUserCourses] = useState([]);
  const token = useToken();

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
          {userCourses.map((c) => (
            <CourseBox key={c.id} course={c} />
          ))}
        </Container>
      </Main>
    </>
  );
}
