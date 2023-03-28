import React, { useState, useEffect } from "react";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

export default function Variant({ moves, userColor }) {
  const [variant, setVariant] = useState(null);
  const fen = "";

  const [game] = useState(fen ? new Chess(fen) : new Chess());

  useEffect(() => {
    const timer = setTimeout(() => {
      setVariant({
        fen: game.fen(),
        moves: moves,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!variant) {
    return <div>Loading...</div>;
  }

  return <ChessboardVariant variant={variant} userColor={userColor} />;
}
