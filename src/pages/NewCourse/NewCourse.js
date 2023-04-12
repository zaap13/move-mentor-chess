import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaChessPawn,
  FaChessKnight,
  FaChessBishop,
  FaChessRook,
  FaChessQueen,
} from "react-icons/fa";

function FenInputChessboard() {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [position, setPosition] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [inputValue, setInputValue] = useState(fen);
  const [game, setGame] = useState(new Chess(fen));

  const pieceButtons = [
    { label: "Peão Branco", value: "wP", icon: FaChessPawn },
    { label: "Cavalo Branco", value: "wN", icon: FaChessKnight },
    { label: "Bispo Branco", value: "wB", icon: FaChessBishop },
    { label: "Torre Branca", value: "wR", icon: FaChessRook },
    { label: "Rainha Branca", value: "wQ", icon: FaChessQueen },
    { label: "Peão Preto", value: "bP", icon: FaChessPawn },
    { label: "Cavalo Preto", value: "bN", icon: FaChessKnight },
    { label: "Bispo Preto", value: "bB", icon: FaChessBishop },
    { label: "Torre Preta", value: "bR", icon: FaChessRook },
    { label: "Rainha Preta", value: "bQ", icon: FaChessQueen },
  ];

  function handleFenChange(e) {
    if (e.keyCode === 13) {
      const newFen = e.target.value;

      try {
        setGame(new Chess(newFen));
        setFen(newFen);
        setInputValue(newFen);
      } catch (error) {
        toast.warning(error.message);
        setFen(fen);
        setInputValue(fen);
      }
    }
  }

  function onChange(currentPosition) {
    const newFen = objToFen(currentPosition, "w", "KQkq", "-", 0);

    try {
      new Chess(newFen);
    } catch (error) {
      toast.warning(error.message);
      return;
    }
    setFen(newFen);

    setInputValue(newFen);
    setPosition(currentPosition);
  }

  function onSquareClick(square) {
    // Aqui você pode adicionar a lógica para adicionar uma peça no quadrado clicado
    try {
      if (!position[square] && selectedPiece) {
        const newposition = {
          ...position,
          [square]: selectedPiece, // adiciona um cavalo branco na posição clicada
        };
        const fen = objToFen(newposition, "w", "KQkq", "-", 0);
        setGame(new Chess(fen));
      }
    } catch (error) {
      toast.warning(error.message);
    }
  }

  function onSquareRightClick(square) {
    try {
      const newposition = { ...position };
      delete newposition[square];
      const fen = objToFen(newposition, "w", "KQkq", "-", 0);
      setGame(new Chess(fen));
    } catch (error) {
      toast.warning(error.message);
    }
  }

  function handlePieceSelect(value) {
    setSelectedPiece(value);
  }

  function onPieceDrop(sourceSquare, targetSquare, piece) {
    if (position[targetSquare]) {
      if (position[targetSquare][1] === "K") {
        return false;
      }
    }
    try {
      const newposition = { ...position, [targetSquare]: piece };
      delete newposition[sourceSquare];
      const toFen = objToFen(newposition, "w", "KQkq", "-", 0);
      setFen(toFen);
      setInputValue(toFen);
      setPosition(newposition);
      setGame(new Chess(toFen));
      return true;
    } catch (error) {
      toast.warning(error.message);

      return false;
    }
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
    <>
      <Board>
        <h1>{selectedPiece}</h1>
        {pieceButtons.map((button) => (
          <button
            key={button.value}
            onClick={() => handlePieceSelect(button.value)}
            style={{
              backgroundColor:
                selectedPiece === button.value ? "lightblue" : "white",
            }}
          >
            {button.label}
          </button>
        ))}
        {fen}

        <Chessboard
          boardWidth={500}
          position={game.fen()}
          onPieceDrop={onPieceDrop}
          getPositionObject={onChange}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
        />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleFenChange}
        />
      </Board>
      <ToastContainer theme="dark" />
    </>
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
