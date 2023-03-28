import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChessboardVariant({ variant, userColor }) {
  const [chess, setChess] = useState(new Chess(variant.fen));
  const [moves, setMoves] = useState([]);
  const [currentColor, setCurrentColor] = useState(userColor);
  const [nextMoveIndex, setNextMoveIndex] = useState(0);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [highlightedSquare, setHighlightedSquare] = useState(null);
  const [arrow, setArrow] = useState([]);
  const [dragPieces, setDragPieces] = useState(true);

  useEffect(() => {
    setMoves(variant.moves);
    setCurrentColor("w");
    setNextMoveIndex(0);
  }, [variant]);

  useEffect(() => {
    if (moves.length > 0) {
      if (currentColor !== userColor) {
        const timeout = setTimeout(() => {
          const move = moves[nextMoveIndex];
          if (!move) {
            toast.success("Variante terminada");
            setDragPieces(false);
            return;
          }
          const result = chess.move(move, { sloppy: true });

          if (result) {
            setChess(new Chess(chess.fen()));
            setCurrentColor(chess.turn());
            setNextMoveIndex(nextMoveIndex + 1);
          }
        }, 1000);

        return () => clearTimeout(timeout);
      } else {
        setCurrentColor(chess.turn());
      }
    }
  }, [chess, currentColor, moves, nextMoveIndex]);

  const handleMove = (sourceSquare, targetSquare) => {
    if (currentColor === userColor) {
      console.log(moves[nextMoveIndex]);
      if (
        moves[nextMoveIndex].startsWith(sourceSquare) &&
        moves[nextMoveIndex].endsWith(targetSquare)
      ) {
        const move = chess.move(
          {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
          },
          { sloppy: true }
        );

        if (move) {
          setChess(new Chess(chess.fen()));
          setCurrentColor(chess.turn());
          setNextMoveIndex(nextMoveIndex + 1);
        }
      } else {
        setArrow([parseMove(moves[nextMoveIndex])]);
        return;
      }
    }
  };

  function parseMove(move) {
    const re = /^([a-h][1-8])([a-h][1-8])$/;
    const result = move.match(re);
    return result ? [result[1], result[2]] : [undefined, undefined];
  }

  function onMouseOverSquare(square) {
    const moves = chess.moves({ square: square, verbose: true });
    setHighlightedSquare(square);
    setPossibleMoves(moves.map((m) => m.to));
  }

  return (
    <div>
      <div>{`It's ${
        currentColor === userColor ? "your" : "opponent"
      } turn to play ${currentColor === "w" ? "(White)" : "(Black)"}`}</div>
      <Chessboard
        boardWidth={600}
        position={chess.fen()}
        onPieceDrop={nextMoveIndex < moves.length ? handleMove : null}
        customArrows={arrow}
        arePiecesDraggable={dragPieces}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        boardOrientation={userColor === "b" ? "black" : "white"}
        customDarkSquareStyle={{ backgroundColor: "#779952" }}
        customLightSquareStyle={{ backgroundColor: "#edeed1" }}
        onMouseOverSquare={onMouseOverSquare}
        highlightStyle={{ backgroundColor: "rgba(255, 255, 0, 0.4)" }}
        customSquareStyles={{
          [highlightedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
          ...possibleMoves.reduce((obj, move) => {
            obj[move] = { backgroundColor: "rgba(0, 255, 0, 0.4)" };
            return obj;
          }, {}),
        }}
      />
      <ToastContainer theme="colored" />
    </div>
  );
}
