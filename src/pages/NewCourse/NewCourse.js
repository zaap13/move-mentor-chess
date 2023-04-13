import { useState } from "react";
import { Form, Main } from "../../assets/styles/styles";
import Header from "../../components/Header/Header";
import styled from "styled-components";
import { titleFont } from "../../constants/fonts";
import { createCourse } from "../../services/courseApi";
import useToken from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";

export default function NewCourse() {
  const token = useToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await createCourse(formData, token);
    navigate(`/courses/${result.id}`);
  }

  return (
    <Main>
      <Header />
      <Container>
        <h2>Novo curso</h2>
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
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">-- Select a category --</option>
            <option value="Abertura">Abertura</option>
            <option value="Tática">Tática</option>
            <option value="Final">Final</option>
          </select>
          <button type="submit">Create Course</button>
        </Form>
      </Container>
    </Main>
  );
}

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  align-items: flex-start;
  gap: 15px;
  color: #ffffff;

  h2 {
    font-family: ${titleFont};
    font-weight: 700;
    font-size: 32px;
    line-height: 49px;
  }

  @media (max-width: 868px) {
    width: 100vw;
  }
`;
