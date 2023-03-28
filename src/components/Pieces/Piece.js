import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Piece({ initialPosition, calculatePossibleMoves }) {
  const [position, setPosition] = useState(initialPosition);

  const [highlightedSquare, setHighlightedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);

  function onDrop(sourceSquare, targetSquare) {
    const sourcePiece = position[sourceSquare];
    const isPossibleMove = possibleMoves.includes(targetSquare);

    if (!isPossibleMove) {
      toast.warning("Movimento inválido");
      return;
    }

    const newPosition = { ...position };
    delete newPosition[sourceSquare];
    newPosition[targetSquare] = sourcePiece;

    if (Object.keys(initialPosition).length === 1) {
      toast.success("Parabens");
      setPosition(newPosition);
    } else if (Object.keys(newPosition).length < Object.keys(position).length) {
      alert("Peça capturada!");
      setPosition(newPosition);
    } else {
      toast.error("Movimento errado");
    }

    if (
      sourcePiece.charAt(1) === "P" &&
      targetSquare.charAt(1) === ("8" || "1")
    ) {
      alert("Quando o peão chega na última casa ele recebe uma promoção!");
    }
  }

  function onMouseOverSquare(square) {
    const moves = calculatePossibleMoves(square, position);
    setHighlightedSquare(square);
    setPossibleMoves(moves);
  }

  return (
    <>
      <Chessboard
        id="StyledBoard"
        boardWidth={600}
        position={position}
        onPieceDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#779952" }}
        customLightSquareStyle={{ backgroundColor: "#edeed1" }}
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
    </>
  );
}

export default Piece;
