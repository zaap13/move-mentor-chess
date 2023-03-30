import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Board/Loader";
import useToken from "../../hooks/useToken";
import { getLesson } from "../../services/lessonApi";

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
      <Loader lesson={lesson} />
    </>
  );
}
