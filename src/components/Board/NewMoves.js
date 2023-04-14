import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useState } from "react";
import styled from "styled-components";
import { InfoContainer } from "./ChessboardVariant";
import {
  DeleteButton,
  SubscribeButton,
} from "../../pages/CourseDetail/CourseDetail";
import { createLesson } from "../../services/lessonApi";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";

export default function NewMoves({ setBody, body, orientation, loadCourse }) {
  const [pos, setPos] = useState(body.position);
  const [game, setGame] = useState(new Chess(pos));
  const [highlightedSquare, setHighlightedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moves, setMoves] = useState([]);
  const [messages, setMessages] = useState({});
  const token = useToken();
  const navigate = useNavigate();

  async function handleSubmit(body) {
    await createLesson(body, token);
    loadCourse(body.courseId, token);
  }

  async function onPieceDrop(sourceSquare, targetSquare) {
    try {
      const move = game.move(
        {
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        },
        { sloppy: true }
      );

      if (move) {
        const { value: text } = await Swal.fire({
          input: "textarea",
          titleText: `Insira a descrição do movimento: ${sourceSquare} - ${targetSquare}, a menssagem aparecerá após a realização do movimento`,
          inputPlaceholder: "Insira sua menssagem...",
          inputAttributes: {
            "aria-label": "Insira sua menssagem",
          },
          confirmButtonText: "Salvar",
        });
        setPos(game.fen());
        const newMove = `${sourceSquare}${targetSquare}`;
        setMoves((prevState) => [...prevState, newMove]);
        setMessages((prevState) => ({
          ...prevState,
          [newMove]: text ? text : "",
        }));
      }
    } catch (error) {
      toast.warning("Movimento inválido!");
      return false;
    }
  }

  function onMouseOverSquare(square) {
    const moves = game.moves({ square: square, verbose: true });
    setHighlightedSquare(square);
    setPossibleMoves(moves.map((m) => m.to));
  }

  return (
    <Container>
      <Board>
        <Chessboard
          boardWidth={555}
          position={pos}
          onPieceDrop={onPieceDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customDarkSquareStyle={{ backgroundColor: "#779952" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
          boardOrientation={orientation}
          onMouseOverSquare={onMouseOverSquare}
          highlightStyle={{ backgroundColor: "rgba(255, 255, 0, 0.4)" }}
          customSquareStyles={{
            [highlightedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            ...possibleMoves.reduce((obj, move) => {
              obj[move] = { backgroundColor: "rgba(0, 255, 0, 0.4)" };
              return obj;
            }, {}),
          }}
        />
      </Board>
      <InfoContainer>
        <h3>Movimentos</h3>
        <p>
          Nova variante para as {orientation === "white" ? "Brancas" : "Pretas"}
        </p>
        <div>
          <strong>
            Escolha o próximo movimento para as{" "}
            {game.turn() === "w" ? "brancas" : "pretas"}
          </strong>
          <strong>Variante: </strong>
          {moves?.map((m, i) => (
            <span>
              {i + 1}- {m}: {messages[m]}
            </span>
          ))}
        </div>
        <DeleteButton
          onClick={() => {
            const move = game.undo();
            if (!move || !moves) {
              toast.warning("Não foi possível desfazer o movimento");
              return;
            }
            setPos(game.fen());
            const newMoves = moves.slice(0, -1);
            const last = moves.slice(-1)[0];

            setMoves(newMoves);
            setMessages((prevState) => {
              const { [last]: deletedProp, ...rest } = prevState;
              return rest;
            });
          }}
        >
          Desfazer movimento
        </DeleteButton>
        <SubscribeButton
          onClick={() => {
            Swal.fire({
              titleText:
                "Deseja salvar as alterações concluir a nova variante?",
              showCancelButton: true,
              confirmButtonText: "Salvar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Ok!", "", "success").then(() => {
                  setBody((prevState) => ({
                    ...prevState,
                    moves: moves,
                    messages: messages,
                  }));
                  const newBody = { ...body, moves: moves, messages: messages };
                  handleSubmit(newBody);
                });
              }
            });
          }}
        >
          Concluir e salvar{" "}
        </SubscribeButton>
      </InfoContainer>
      <ToastContainer theme="dark" />
    </Container>
  );
}

const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 868px) {
    flex-direction: column;
  }
`;
