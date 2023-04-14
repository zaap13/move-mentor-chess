import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

const Lesson = styled.div`
  display: flex;
`;

export default function Game({ lesson }) {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVariant({
        fen: lesson.position,
        moves: lesson.moves,
        msg: lesson.messages,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [lesson]);

  if (!variant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Lesson>
        <ChessboardVariant variant={variant} lesson={lesson} />
      </Lesson>
    </>
  );
}
