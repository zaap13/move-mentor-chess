import Bishop from "./Bishop";
import King from "./King";
import Knight from "./Knight";
import Pawn from "./Pawn";
import Queen from "./Queen";
import Rook from "./Rook";

const components = {
  Bishop,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
};

export default function PieceLoader({ componentName, initialPosition }) {
  const Component = components[componentName];
  return <Component initialPosition={initialPosition} />;
}
