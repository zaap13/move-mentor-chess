import Piece from "./Piece";

export default function Rook({ initialPosition }) {
  return (
    <>
      <Piece
        initialPosition={initialPosition}
        calculatePossibleMoves={calculatePossibleMoves}
      />
    </>
  );
}

function calculatePossibleMoves(square, position) {
  const row = square.charAt(1);
  const col = square.charCodeAt(0);
  const moves = [];

  if (position[square]?.charAt(1) !== "R") {
    return moves;
  }

  // horizontal moves
  for (let c = 97; c <= 104; c++) {
    const file = String.fromCharCode(c);
    if (file !== String.fromCharCode(col)) {
      moves.push(file + row);
    }
  }

  // vertical moves
  for (let r = 1; r <= 8; r++) {
    const rank = r.toString();
    if (rank !== row) {
      moves.push(String.fromCharCode(col) + rank);
    }
  }

  return moves;
}
