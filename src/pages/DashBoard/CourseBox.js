import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { titleFont } from "../../constants/fonts";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function CourseBox({ course }) {
  const [showLessons, setShowLessons] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const progress = (
      (course.lessons.filter((l) => l.progresses[0]?.completed).length /
        course.lessons.length) *
      100
    ).toFixed(2);
    setProgress(progress);
  }, [course]);

  const toggleLessons = () => {
    setShowLessons(!showLessons);
  };

  return (
    <Course>
      <ImageContainer>
        <img src={course.image} alt="" />
      </ImageContainer>
      <CourseDetails>
        <h2>{course.title}</h2>
        <ProgressBarContainer>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={{
              path: {
                stroke: "#2f80ed",
              },
              trail: {
                stroke: "#000",
              },
              text: {
                fill: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
              },
            }}
          />
        </ProgressBarContainer>
        <Dropdown onClick={toggleLessons}>
          <span>Lessons</span>
          <Arrow showLessons={showLessons} />
        </Dropdown>
        {showLessons && (
          <LessonList>
            {course.lessons.map((l) => (
              <Lesson key={l.id} onClick={() => navigate(`/lesson/${l.id}`)}>
                <LessonTitle>{l.title}</LessonTitle>
                <LessonStatus completed={l.progresses[0]?.completed}>
                  {l.progresses[0]?.completed && <FaCheck color="green" />}
                </LessonStatus>
              </Lesson>
            ))}
          </LessonList>
        )}
      </CourseDetails>
    </Course>
  );
}

const Course = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #313143;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 10px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CourseDetails = styled.div`
  font-family: ${titleFont};
  margin-left: 110px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  h2 {
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #ffffff;
  }
`;

const ProgressBarContainer = styled.div`
  margin-right: 15px;
  width: 60px;
  align-self: flex-end;
`;

const Dropdown = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: auto;

  span {
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    margin-right: 15px;
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #ffffff;
  transition: transform 0.3s ease-in-out;

  ${({ showLessons }) =>
    showLessons &&
    `
    transform: translateY(-50%) rotate(180deg);
  `}
`;

const LessonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  background-color: #403a5f;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Lesson = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 18px;
  color: #fff;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #2b72c3;
    cursor: pointer;
  }
`;

const LessonTitle = styled.div`
  margin-right: 10px;
`;

const LessonStatus = styled.div`
  color: ${({ completed }) => (completed ? "#4CAF50" : "#E65100")};
`;
