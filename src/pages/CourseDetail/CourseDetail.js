import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Main, Title } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import { titleFont } from "../../constants/fonts";
import useToken from "../../hooks/useToken";
import {
  deleteCourse,
  deleteSubscribe,
  getCourse,
  subscribeCourse,
} from "../../services/courseApi";
import useUser from "../../hooks/useUser";
import NewLesson from "../NewLesson/NewLesson";

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const token = useToken();
  const [subscribe, setSubscribe] = useState(0);
  const user = useUser();
  const navigate = useNavigate();
  const [newLesson, setNewLesson] = useState(false);

  async function loadCourse(id, token) {
    const result = await getCourse(id, token);
    setCourse(result);
    setSubscribe(result.subscribe);
  }

  useEffect(() => {
    loadCourse(id, token);
  }, [id, token]);

  async function handleNewLesson() {
    setNewLesson((newLesson) => (newLesson === true ? false : true));
  }

  async function handleUnsubscribe() {
    await deleteSubscribe(subscribe, token);
    setSubscribe(false);
  }

  async function handleSubscribe() {
    await subscribeCourse(course.id, token);
    setSubscribe(true);
  }

  async function handleDelete() {
    await deleteCourse(course.id, token);
    navigate("/");
  }

  if (!course) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <Main>
        <Container>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseImage src={course.image} alt={course.title} />
          <CourseDescription>{course.description}</CourseDescription>
          <span>
            {subscribe ? (
              <DeleteButton onClick={handleUnsubscribe}>
                Cancelar assinatura
              </DeleteButton>
            ) : (
              <SubscribeButton onClick={handleSubscribe}>
                Inscreva-se
              </SubscribeButton>
            )}
            {user.id === course.creatorId && (
              <DeleteButton onClick={handleDelete}>Deletar curso</DeleteButton>
            )}
          </span>

          <LessonsList>
            <h2>Variantes:</h2>
            {user.id === course.creatorId && (
              <SubscribeButton onClick={handleNewLesson}>
                Adicionar nova aula/variante
              </SubscribeButton>
            )}

            {newLesson && <NewLesson courseId={course.id} />}

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

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  align-items: flex-start;
  gap: 15px;
  color: #ffffff;

  span {
    display: flex;
    gap: 15px;
  }

  h2 {
    font-family: ${titleFont};
    font-weight: 700;
    font-size: 32px;
    line-height: 49px;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const CourseTitle = styled(Title)`
  margin-top: 0;
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
    font-size: 24px;
    font-weight: bold;
    color: white;
    margin-bottom: 16px;
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

const DeleteButton = styled.button`
  background-color: #000;
  color: #ff4d4d;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #ff4d4d;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: ${titleFont};

  &:hover {
    background-color: #cc0000;
  }
`;
