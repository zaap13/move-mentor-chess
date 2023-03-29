import React, { useState, useEffect } from "react";
import ChessboardVariant from "./ChessboardVariant";
import { Chess } from "chess.js";

export default function Variant({ moves, userColor, position }) {
  const [variant, setVariant] = useState(null);
  const [game] = useState(position ? new Chess(position) : new Chess());

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
