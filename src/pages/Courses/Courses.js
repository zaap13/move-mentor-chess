import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import { titleFont } from "../../constants/fonts";
import useToken from "../../hooks/useToken";
import { getCourses } from "../../services/courseApi";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const token = useToken();
  const navigate = useNavigate();

  async function loadCourses(token) {
    const result = await getCourses(token);
    setCourses(result);
    console.log(result);
  }

  useEffect(() => {
    loadCourses(token);
  }, [token]);

  return (
    <>
      <Header isFixed={true} />
      <Main>
        <Container>
          <Title>Cursos</Title>
          <CourseGrid>
            {courses.map((course) => (
              <CourseCard key={course.id}>
                <CourseImage src={course.image} alt={course.title} />
                <CourseInfo>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                  <CourseButton
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Saiba mais
                  </CourseButton>
                </CourseInfo>
              </CourseCard>
            ))}
          </CourseGrid>
        </Container>
      </Main>
    </>
  );
}

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CourseCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #313143;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  color: #fff;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourseInfo = styled.div`
  padding: 1rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CourseButton = styled.button`
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
`;
