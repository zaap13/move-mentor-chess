import { useEffect, useState } from "react";
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
  FaTrashRestore,
  FaUndo,
  FaChess,
  FaGamepad,
} from "react-icons/fa";
import { FcNext } from "react-icons/fc";
import { titleFont } from "../../constants/fonts";
import { Text } from "../../assets/styles/styles";
import Swal from "sweetalert2";

export default function NewPosition({ setBody }) {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [position, setPosition] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [inputValue, setInputValue] = useState(fen);
  const [game, setGame] = useState(new Chess(fen));
  const [orientation, setOrientation] = useState("white");
  const [castleOptions, setCastleOptions] = useState("KQkq");
  const [player, setPlayer] = useState("w");

  const [fenBoard, setFenBoard] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  );
  const [fenEnPassant, setFenEnPassant] = useState("-");
  const [fenHalfMoves, setfenHalfMoves] = useState(0);
  const [fenFullMoves, setFenFullMoves] = useState(1);

  useEffect(() => {
    const newFen = `${fenBoard} ${player} ${castleOptions} ${fenEnPassant} ${fenHalfMoves} ${fenFullMoves}`;

    setFen(newFen);
    setInputValue(newFen);
  }, [fenBoard, castleOptions, player]);

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

  function handleCastleOptionChange(option) {
    let newOptions = castleOptions;
    if (newOptions.includes(option)) {
      newOptions = newOptions.replace(option, "");
    } else {
      newOptions += option;
    }
    if (newOptions === "") {
      newOptions = "-";
    }
    setCastleOptions(newOptions);
  }

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
    const newFen = objToFen(currentPosition, player, castleOptions, "-", 0);

    try {
      new Chess(newFen);
    } catch (error) {
      return;
    }
    setFen(newFen);

    setInputValue(newFen);
    setPosition(currentPosition);
  }

  function onSquareClick(square) {
    try {
      if (!position[square] && selectedPiece) {
        const newposition = {
          ...position,
          [square]: selectedPiece,
        };
        const fen = objToFen(newposition, player, castleOptions, "-", 0);
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
      const fen = objToFen(newposition, player, castleOptions, "-", 0);
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
      const toFen = objToFen(newposition, player, castleOptions, "-", 0);
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
      (player === "w"
        ? Math.ceil(halfMoves / 2) + 1
        : Math.ceil(halfMoves / 2)) + (player === "b" ? 1 : 0);

    setFenBoard(fenBoard);
    setPlayer(fenPlayer);
    setCastleOptions(fenCastling);
    setFenEnPassant(fenEnPassant);
    setfenHalfMoves(fenHalfMoves);
    setFenFullMoves(fenFullMoves);

    return `${fenBoard} ${fenPlayer} ${fenCastling} ${fenEnPassant} ${fenHalfMoves} ${fenFullMoves}`;
  }

  return (
    <>
      <Text>
        {" -"} Para adicionar novas peças selecione-a e clique na casa desejada,
        para excluir use o botão direito.
      </Text>
      <Container>
        <Pieces>
          {pieceButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => handlePieceSelect(button.value)}
              style={{
                backgroundColor:
                  selectedPiece === button.value ? "#0069d9" : "",
                borderRadius: "5px",
              }}
            >
              {
                <button.icon
                  color={button.value.charAt(0) === "w" ? "white" : "black"}
                  fontSize={"35px"}
                  title={button.label}
                  cursor={"pointer"}
                />
              }
            </button>
          ))}
        </Pieces>
        <Board>
          <Chessboard
            boardWidth={500}
            position={game.fen()}
            onPieceDrop={onPieceDrop}
            getPositionObject={onChange}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            customDarkSquareStyle={{ backgroundColor: "#779952" }}
            customLightSquareStyle={{ backgroundColor: "#edeed1" }}
            boardOrientation={orientation}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleFenChange}
          />
        </Board>
        <Pieces>
          <label
            onClick={() =>
              setOrientation(orientation === "white" ? "black" : "white")
            }
          >
            <FaChess
              color={orientation === "white" ? "white" : "black"}
              fontSize="35px"
              title={"Inverter Jogador"}
              cursor={"pointer"}
            />
            <span>{`Jogador controla: ${
              orientation === "white" ? "Brancas" : "Pretas"
            }`}</span>
          </label>
          <label onClick={() => setPlayer(player === "w" ? "b" : "w")}>
            <FaGamepad
              color={player === "w" ? "white" : "black"}
              fontSize="35px"
              title={`Primeiro movimento será das ${
                player === "w" ? "Brancas" : "Pretas"
              }`}
              cursor={"pointer"}
            />
            <span>{player === "w" ? "Brancas Jogam!" : "Pretas Jogam!"}</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={castleOptions.includes("K")}
              onChange={() => handleCastleOptionChange("K")}
            />
            <span>Brancas: Roque menor</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={castleOptions.includes("Q")}
              onChange={() => handleCastleOptionChange("Q")}
            />
            <span>Brancas: Roque maior</span>{" "}
          </label>
          <label>
            <input
              type="checkbox"
              checked={castleOptions.includes("k")}
              onChange={() => handleCastleOptionChange("k")}
            />
            <span>Pretas: Roque menor</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={castleOptions.includes("q")}
              onChange={() => handleCastleOptionChange("q")}
            />
            <span>Pretas: Roque maior</span>
          </label>
          <label
            onClick={() => {
              setGame(new Chess("4k3/8/8/8/8/8/8/4K3 w KQkq - 0 1"));
              setCastleOptions("-");
            }}
          >
            <FaTrashRestore
              color="white"
              fontSize="35px"
              title="Limpar Tabuleiro"
              cursor={"pointer"}
            />
            <span>Limpar Tabuleiro</span>
          </label>
          <label
            onClick={() => {
              setGame(new Chess());
              setCastleOptions("qkQK");
            }}
          >
            <FaUndo
              color="white"
              fontSize="35px"
              title="Posição Inicial"
              cursor={"pointer"}
            />
            <span>Posição Inicial</span>
          </label>
          <button
            onClick={() => {
              Swal.fire({
                titleText:
                  "Deseja salvar as alterações e ir para a próxima etapa?",
                showCancelButton: true,
                confirmButtonText: "Salvar",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Ok!", "", "success").then(() => {
                    setBody((prevState) => ({
                      ...prevState,
                      position: inputValue,
                      userColor: orientation === "white" ? "w" : "b",
                    }));
                  });
                }
              });
            }}
          >
            Definir posição inicial{" - - -"}
            <FcNext />
          </button>
        </Pieces>

        <ToastContainer theme="dark" />
      </Container>
    </>
  );
}

const Pieces = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 600px;
  justify-content: space-evenly;

  button {
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    color: #2f80ed;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 2px solid #2f80ed;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    font-family: ${titleFont};

    &:hover {
      background-color: #2b72c3;
    }
  }

  label {
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    span {
      color: #fff;
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
