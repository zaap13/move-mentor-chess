import Bishop from "../Pieces/Bishop";
import King from "../Pieces/King";
import Knight from "../Pieces/Knight";
import Pawn from "../Pieces/Pawn";
import Queen from "../Pieces/Queen";
import Rook from "../Pieces/Rook";
import Chess from "./Chess";

const components = {
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
  Chess,
};

export default function Loader({
  piece,
  position,
  moves,
  userColor,
  progresses,
}) {
  const Component = components[piece];
  return (
    <Component
      position={position}
      moves={moves}
      userColor={userColor}
      progresses={progresses}
    />
  );
}
