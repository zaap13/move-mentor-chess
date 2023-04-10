import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import { titleFont } from "../../constants/fonts";
import useToken from "../../hooks/useToken";
import { getCourse, subscribeCourse } from "../../services/courseApi";

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const token = useToken();
  const [subscribe, setSubscribe] = useState();

  async function loadCourse(id, token) {
    const result = await getCourse(id, token);
    setCourse(result);
    setSubscribe(result.subscribe);
  }

  useEffect(() => {
    loadCourse(id, token);
  }, [id, token]);

  async function handleSubscribe() {
    await subscribeCourse(course.id, token);
    setSubscribe(true);
  }

  if (!course) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header isFixed={true} />
      <Main>
        <Container>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseImage src={course.image} alt={course.title} />
          <CourseDescription>{course.description}</CourseDescription>
          {subscribe ? (
            "INCRITO"
          ) : (
            <SubscribeButton onClick={handleSubscribe}>
              Inscreva-se
            </SubscribeButton>
          )}
          <LessonsList>
            <h2>Variantes:</h2>
            {course.lessons.map((lesson) => (
              <Lesson key={lesson.id}>
                <LessonTitle>{lesson.title}</LessonTitle>
              </Lesson>
            ))}
          </LessonsList>
        </Container>
      </Main>
    </>
  );
}

const CourseTitle = styled(Title)`
  margin-top: 2rem;
  text-align: center;
`;


const CourseImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const CourseDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  color: white;
`;

const LessonsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  h2 {
    color: white;

  }
`;

const Lesson = styled.li`
  margin-bottom: 2rem;
  position: relative;
`;

const LessonTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  margin-left: 2rem;

  &:before {
    content: "▸";
    margin-right: 0.5rem;
  }
`;

const SubscribeButton = styled.button`
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
