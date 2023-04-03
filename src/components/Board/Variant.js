import React, { useState, useEffect } from "react";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

export default function Variant({ lesson }) {
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

  return <ChessboardVariant variant={variant} lesson={lesson} />;
}
