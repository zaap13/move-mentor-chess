import Piece from "./Piece";

export default function King({ initialPosition }) {
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

  if (position[square]?.charAt(1) !== "K") {
    return moves;
  }

  // King moves
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        const newRow = String.fromCharCode(row.charCodeAt(0) + i);
        const newCol = String.fromCharCode(col + j);
        if (newRow >= "1" && newRow <= "8" && newCol >= "a" && newCol <= "h") {
          moves.push(newCol + newRow);
        }
      }
    }
  }

  return moves;
}
