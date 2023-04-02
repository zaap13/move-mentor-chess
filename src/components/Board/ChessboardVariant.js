import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { completeLesson } from "../../services/lessonApi";
import useToken from "../../hooks/useToken";
import styled from "styled-components";

export default function ChessboardVariant({ variant, lesson }) {
  const [chess, setChess] = useState(new Chess(variant.fen));
  const [moves, setMoves] = useState([]);
  const [currentColor, setCurrentColor] = useState(lesson.userColor);
  const [nextMoveIndex, setNextMoveIndex] = useState(0);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [highlightedSquare, setHighlightedSquare] = useState(null);
  const [arrow, setArrow] = useState([]);
  const [dragPieces, setDragPieces] = useState(true);
  const [isDemo, setIsDemo] = useState(true);
  const token = useToken();

  function resetGame() {
    setMoves(variant.moves);
    setCurrentColor(lesson.userColor);
    setNextMoveIndex(0);
    setDragPieces(true);
    if (lesson.progresses) {
      setIsDemo(false);
    }
  }
  useEffect(() => {
    resetGame();
  }, [variant]);

  useEffect(() => {
    if (isDemo) {
      const timeout = setTimeout(() => {
        const move = moves[nextMoveIndex];
        if (!move) {
          setIsDemo(false);
          setChess(new Chess(variant.fen));
          resetGame();
          setCurrentColor(lesson.userColor);
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
    } else if (moves.length > 0) {
      if (currentColor !== lesson.userColor) {
        const timeout = setTimeout(() => {
          const move = moves[nextMoveIndex];
          if (!move) {
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
  }, [chess, currentColor, moves, nextMoveIndex, isDemo]);

  async function handleComplete(id) {
    await completeLesson(id, token);
  }

  useEffect(() => {
    if (moves.length > 0 && !isDemo) {
      if (currentColor !== lesson.userColor) {
        const timeout = setTimeout(() => {
          const move = moves[nextMoveIndex];
          if (!move) {
            toast.success("Variante terminada");
            setDragPieces(false);
            if (!lesson.progresses) {
              handleComplete(lesson.id);
              alert("Parabens");
            }
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
  }, [moves, nextMoveIndex]);

  const handleMove = (sourceSquare, targetSquare) => {
    if (currentColor === lesson.userColor) {
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
          if (variant.msg[moves[nextMoveIndex]]) {
            alert(variant.msg[moves[nextMoveIndex]]);
          }
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

  function handleReview() {
    setMoves(variant.moves);
    setCurrentColor(lesson.userColor);
    setNextMoveIndex(0);
    setChess(new Chess(variant.fen));
    setIsDemo(true);
  }

  return (
    <ChessTable>
      <Chessboard
        boardWidth={555}
        position={chess.fen()}
        onPieceDrop={nextMoveIndex < moves.length ? handleMove : null}
        customArrows={arrow}
        arePiecesDraggable={dragPieces}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        boardOrientation={lesson.userColor === "b" ? "black" : "white"}
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
      <p>{`É ${
        currentColor === lesson.userColor ? "sua vez" : "vez do oponente"
      } jogar de ${currentColor === "w" ? "(Brancas)" : "(Negras)"}`}</p>
      <h3 onClick={() => handleReview()}>Rever Variante</h3>
    </ChessTable>
  );
}

const ChessTable = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  p {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #dddddd;
  }

  h3 {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0069d9;
    }
  }
`;
