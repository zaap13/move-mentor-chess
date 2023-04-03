import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { getLesson } from "../../services/lessonApi";
import Chess from "../../components/Board/Chess";

export default function Lesson() {
  const { id } = useParams();
  const token = useToken();

  const [lesson, setLesson] = useState([]);

  async function loadLesson() {
    const lesson = await getLesson(id, token);
    setLesson(lesson);
  }

  useEffect(() => {
    loadLesson();
  }, []);

  return (
    <>
      <Chess lesson={lesson} />
    </>
  );
}
