import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { titleFont } from "../../constants/fonts";
import { useNavigate } from "react-router-dom";

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
                stroke: "#1abc9c",
              },
              trail: {
                stroke: "#3d3d3d",
              },
              text: {
                fill: "#ffffff",
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
                {l.title} - {l.progresses[0]?.completed ? "OK" : "X"}
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
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #313143;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
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
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  background-color: #403a5f;
  border-radius: 5px;
  padding: 10px;
  gap: 5px;
`;

const Lesson = styled.li`
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 5px;
  :hover {
    background-color: #313143;
    border: 0.1px solid #ffffff;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
