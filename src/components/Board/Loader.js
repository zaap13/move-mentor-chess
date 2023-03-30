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

export default function Loader({ lesson }) {
  const Component = components[lesson.piece];

  if (Component) {
    return <Component lesson={lesson} />;
  } else {
    return <div>Component not found</div>;
  }
}
