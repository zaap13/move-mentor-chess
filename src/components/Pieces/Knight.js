import Piece from "./Piece";

export default function Knight({ initialPosition }) {
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

  if (position[square]?.charAt(1) !== "N") {
    return moves;
  }

  // Generate all possible knight moves
  const offsets = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];
  offsets.forEach(([dx, dy]) => {
    const r = String.fromCharCode(row.charCodeAt(0) + dy);
    const c = String.fromCharCode(col + dx);
    if (r >= "1" && r <= "8" && c >= "a" && c <= "h") {
      const targetSquare = c + r;
      if (
        position[targetSquare] === undefined ||
        position[targetSquare].charAt(0) !== "w"
      ) {
        moves.push(targetSquare);
      }
    }
  });

  return moves;
}
