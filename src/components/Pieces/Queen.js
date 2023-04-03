import Piece from "./Piece";

export default function Queen({ lesson }) {
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
  const col = square.charCodeAt(0);
  const moves = [];

  if (position[square]?.charAt(1) !== "Q") {
    return moves;
  }

  for (let i = 1; i < 8; i++) {
    const r1 = row.charCodeAt(0) - i;
    const r2 = row.charCodeAt(0) + i;
    const c1 = col - i;
    const c2 = col + i;

    if (r1 >= 49 && c1 >= 97) {
      moves.push(String.fromCharCode(c1) + String.fromCharCode(r1));
    }

    if (r1 >= 49 && c2 <= 104) {
      moves.push(String.fromCharCode(c2) + String.fromCharCode(r1));
    }

    if (r2 <= 56 && c1 >= 97) {
      moves.push(String.fromCharCode(c1) + String.fromCharCode(r2));
    }

    if (r2 <= 56 && c2 <= 104) {
      moves.push(String.fromCharCode(c2) + String.fromCharCode(r2));
    }
  }

  for (let i = 1; i < 8; i++) {
    const r1 = row.charCodeAt(0) - i;
    const r2 = row.charCodeAt(0) + i;
    const c1 = col - i;
    const c2 = col + i;
    if (r1 >= 49) {
      moves.push(String.fromCharCode(col) + String.fromCharCode(r1));
    }

    if (r2 <= 56) {
      moves.push(String.fromCharCode(col) + String.fromCharCode(r2));
    }

    if (c1 >= 97) {
      moves.push(
        String.fromCharCode(c1) + String.fromCharCode(row.charCodeAt(0))
      );
    }

    if (c2 <= 104) {
      moves.push(
        String.fromCharCode(c2) + String.fromCharCode(row.charCodeAt(0))
      );
    }
  }

  return moves;
}
