import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

const Lesson = styled.div`
  display: flex;
`;

export default function Game({ lesson }) {
  const { position, messages = {}, moves = [] } = lesson;
  const [variant, setVariant] = useState(null);
  const game = new Chess(position);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVariant({
        fen: game.fen(),
        moves: moves,
        msg: messages,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [game.fen()]);

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
