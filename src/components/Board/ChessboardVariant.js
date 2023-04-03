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
              toast.success("Parabens, lição completa");
            }
            return;
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
      const nextMove = moves[nextMoveIndex];
      const expectedMove = `${sourceSquare}${targetSquare}`;

      if (nextMove && nextMove.startsWith(expectedMove)) {
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
        setArrow([parseMove(nextMove)]);
        toast.error("Movimento errado, tente de novo");
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
    if (dragPieces) {
      const moves = chess.moves({ square: square, verbose: true });
      setHighlightedSquare(square);
      setPossibleMoves(moves.map((m) => m.to));
    } else {
      setHighlightedSquare(null);
      setPossibleMoves([]);
    }
  }

  function handleReview() {
    setMoves(variant.moves);
    setCurrentColor(lesson.userColor);
    setNextMoveIndex(0);
    setChess(new Chess(variant.fen));
    setIsDemo(true);
  }

  return (
    <>
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
      <InfoContainer>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
        <div>
          <strong>{moves[nextMoveIndex - 1]}</strong>
          <span>{variant.msg[moves[nextMoveIndex - 1]]}</span>
        </div>
      </InfoContainer>
    </>
  );
}

const ChessTable = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 5px;

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

const InfoContainer = styled.div`
  background-color: #1c1c1c;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  height: 555px;
  margin-left: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 2px solid #fff;
    padding-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    font-size: 14px;
    background-color: #333;
    border: 0.1px solid #fff;
    padding: 10px;

    strong {
      font-weight: bold;
    }
    span {
      color: #00c853;
      font-weight: bold;
    }
  }
`;
