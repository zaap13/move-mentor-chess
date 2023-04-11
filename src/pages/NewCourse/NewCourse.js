import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styled from "styled-components";

function FenInputChessboard() {
  const [fen, setFen] = useState("start");
  const [currentPosition, setCurrentPosition] = useState({});

  function handleFenChange(e) {
    setFen(e.target.value);
  }

  function onChange(currentPosition) {
    const fen = objToFen(currentPosition, "w", "KQkq", "-", 0);
    console.log(currentPosition);
    const chess = new Chess(fen);
    const newFen = chess.fen();
    setFen(newFen);
    console.log(newFen);
    setCurrentPosition(currentPosition);
  }

  function onSquareClick(square) {
    // Aqui você pode adicionar a lógica para adicionar uma peça no quadrado clicado
    const newCurrentPosition = {
      ...currentPosition,
      [square]: "wN", // adiciona um cavalo branco na posição clicada
    };
    onChange(newCurrentPosition);
    setCurrentPosition(newCurrentPosition);
  }

  function onSquareRightClick(square) {
    const newCurrentPosition = { ...currentPosition };
    delete newCurrentPosition[square];
    onChange(newCurrentPosition);
    setCurrentPosition(newCurrentPosition);
  }

  function objToFen(obj, player, castling, enPassant, halfMoves) {
    const pieceConversionTable = {
      P: "p",
      N: "n",
      B: "b",
      R: "r",
      Q: "q",
      K: "k",
    };

    const board = new Array(8).fill(null).map(() => new Array(8).fill(""));
    Object.entries(obj).forEach(([square, piece]) => {
      const [col, row] = square.split("");
      const pieceChar = pieceConversionTable[piece[1]];
      board[8 - row][col.charCodeAt(0) - 97] =
        piece[0] === "w" ? pieceChar.toUpperCase() : pieceChar.toLowerCase();
    });

    const rows = [];
    board.forEach((row) => {
      let fenRow = "";
      let emptySquares = 0;
      row.forEach((square) => {
        if (square) {
          if (emptySquares > 0) {
            fenRow += emptySquares;
            emptySquares = 0;
          }
          fenRow += square;
        } else {
          emptySquares++;
        }
      });
      if (emptySquares > 0) {
        fenRow += emptySquares;
      }
      rows.push(fenRow);
    });

    const fenBoard = rows.join("/");
    const fenPlayer = player === "w" ? "w" : "b";
    const fenCastling = castling ? castling : "-";
    const fenEnPassant = enPassant ? enPassant : "-";
    const fenHalfMoves = halfMoves !== undefined ? halfMoves : 0;
    const fenFullMoves =
      player === "w" ? Math.ceil(halfMoves / 2) + 1 : Math.ceil(halfMoves / 2);

    return `${fenBoard} ${fenPlayer} ${fenCastling} ${fenEnPassant} ${fenHalfMoves} ${fenFullMoves}`;
  }

  return (
    <Board>
      <Chessboard
        boardWidth={500}
        position={fen}
        getPositionObject={onChange}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
      />
      <input type="text" value={fen} onChange={handleFenChange} />
    </Board>
  );
}

const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin: 10px;
    width: 500px;
    background-color: #fff;
  }
`;

export default FenInputChessboard;
