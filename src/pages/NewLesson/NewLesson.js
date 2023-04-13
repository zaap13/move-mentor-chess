import { useState } from "react";
import NewPosition from "../../components/Board/NewPosition";
import { Main } from "../../assets/styles/styles";
import NewMoves from "../../components/Board/NewMoves";

export default function NewLesson({ courseId }) {
  const [body, setBody] = useState({ courseId });
  console.log(body);
  return (
    <Main>
      {!body.position ? (
        <NewPosition setBody={setBody} />
      ) : (
        <NewMoves setBody={setBody} />
      )}
    </Main>
  );
}
