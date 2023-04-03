import styled from "styled-components";
import Header from "../Header/Header";
import Variant from "./Variant";

export default function Chess({ lesson }) {
  return (
    <>
      <Header />

      <Lesson>
        <Variant lesson={lesson} />
        
      </Lesson>
    </>
  );
}

const Lesson = styled.div`
  display: flex;
`;
