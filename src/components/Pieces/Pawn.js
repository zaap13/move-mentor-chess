import Piece from "./Piece";

export default function Pawn({ lesson }) {
  const { position } = lesson;
  return (
    <>
      <Piece
        position={position}
        calculatePossibleMoves={calculatePossibleMoves}
      />
    </>
  );
}

function calculatePossibleMoves(square, position) {
  const row = square.charAt(1);
  const col = square.charAt(0);
  const moves = [];

  if (position[square]?.charAt(1) !== "P") {
    return moves;
  }

  const forwardOneRow = String.fromCharCode(row.charCodeAt(0) + 1);
  const forwardTwoRows = String.fromCharCode(row.charCodeAt(0) + 2);

  // check if pawn can move one square forward
  if (position[col + forwardOneRow] === undefined) {
    moves.push(col + forwardOneRow);
  }

  // check if pawn can move two squares forward
  if (
    row === "2" &&
    position[col + forwardOneRow] === undefined &&
    position[col + forwardTwoRows] === undefined
  ) {
    moves.push(col + forwardTwoRows);
  }

  // check if pawn can capture diagonally to the left
  if (col > "a") {
    const leftCaptureRow = String.fromCharCode(row.charCodeAt(0) + 1);
    const leftCaptureCol = String.fromCharCode(col.charCodeAt(0) - 1);
    if (
      position[leftCaptureCol + leftCaptureRow] &&
      position[leftCaptureCol + leftCaptureRow][0] === "b"
    ) {
      moves.push(leftCaptureCol + leftCaptureRow);
    }
  }

  // check if pawn can capture diagonally to the right
  if (col < "h") {
    const rightCaptureRow = String.fromCharCode(row.charCodeAt(0) + 1);
    const rightCaptureCol = String.fromCharCode(col.charCodeAt(0) + 1);
    if (
      position[rightCaptureCol + rightCaptureRow] &&
      position[rightCaptureCol + rightCaptureRow][0] === "b"
    ) {
      moves.push(rightCaptureCol + rightCaptureRow);
    }
  }
  console.log(moves);
  return moves;
}
