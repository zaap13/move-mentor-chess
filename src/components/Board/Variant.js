import React, { useState, useEffect } from "react";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

export default function Variant({ lesson }) {
  const { moves, position } = lesson;
  const [variant, setVariant] = useState(null);
  const [game] = useState(position.fen ? new Chess(position.fen) : new Chess());

  useEffect(() => {
    const timer = setTimeout(() => {
      setVariant({
        fen: game.fen(),
        moves: Object.keys(moves),
        msg: moves,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!variant) {
    return <div>Loading...</div>;
  }

  return <ChessboardVariant variant={variant} lesson={lesson} />;
}
