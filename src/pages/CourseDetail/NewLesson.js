import { useEffect, useState } from "react";
import NewPosition from "../../components/Board/NewPosition";
import { Form } from "../../assets/styles/styles";
import NewMoves from "../../components/Board/NewMoves";
import Swal from "sweetalert2";
import styled from "styled-components";
import { SubscribeButton } from "./CourseDetail";

export default function NewLesson({ courseId, loadCourse }) {
  const [body, setBody] = useState({ courseId });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [body]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    Swal.fire({
      titleText: "Deseja salvar as alterações e ir para a próxima etapa?",
      showCancelButton: true,
      confirmButtonText: "Salvar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (formData.title && formData.description) {
          Swal.fire("Ok!", "", "success").then(() => {
            setBody((prevState) => ({
              ...prevState,
              title: formData.title,
              description: formData.description,
            }));
          });
        } else {
          Swal.fire("Todos os campos devem ser preenchidos!", "", "error");
        }
      }
    });
  }

  return (
    <Main>
      <br />
      {!body.title ? (
        <Form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <SubscribeButton type="submit">Salvar e avançar</SubscribeButton>
        </Form>
      ) : !body.position ? (
        <NewPosition setBody={setBody} />
      ) : (
        !body.moves && (
          <NewMoves
            setBody={setBody}
            body={body}
            orientation={body.userColor === "w" ? "white" : "black"}
            loadCourse={loadCourse}
          />
        )
      )}
    </Main>
  );
}

export const Main = styled.main`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 60vw;
  @media (max-width: 868px) {
    width: 100vw;
  }
`;
