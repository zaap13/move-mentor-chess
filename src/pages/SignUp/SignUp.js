import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import pawn from "../../assets/images/pawn.png";
import {
  PublicMain,
  Form,
  LogoBox,
  Text,
  FormBox,
} from "../../assets/styles/styles";
import useSignUp from "../../hooks/api/useSignUp";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const navigate = useNavigate();
  const { loadingSignUp, signUp } = useSignUp();

  async function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("As senhas devem ser iguais!");
    } else {
      try {
        await signUp(email, password, picture, username);
        toast("Inscrito com sucesso! Por favor, faça login.");
        navigate("/sign-in");
      } catch (error) {
        toast("Não foi possível fazer o cadastro!");
      }
    }
  }

  return (
    <PublicMain>
      <LogoBox>
        <img
          src={pawn}
          alt="Pawn chess white and green"
          onClick={() => navigate("/")}
        />
        <h1>MoveMentor</h1>
        <h2>Aprenda xadrez de forma interativa</h2>
      </LogoBox>
      <FormBox>
        <h2>Dê o primeiro movimento para aprimorar seu jogo de xadrez!</h2>
        <h3>
          Crie sua conta no MoveMentor e tenha acesso a conteúdos incríveis!
        </h3>
        <Form onSubmit={handleSignUp}>
          <input
            disabled={loadingSignUp}
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="password"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            disabled={loadingSignUp}
            type="text"
            placeholder="URL da sua imagem de perfil"
            onChange={(e) => setPicture(e.target.value)}
            required
          />
          <button disabled={loadingSignUp} type="submit">
            Sign Up
          </button>
        </Form>
        <Link to={`/sign-in`}>
          <Text>Já tem uma conta? Faça login!</Text>
        </Link>
      </FormBox>
    </PublicMain>
  );
}
